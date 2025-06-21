import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

interface WalletContextType {
  currentAccount: string | null;
  isConnecting: boolean;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  checkIfWalletIsConnected: () => Promise<void>;
  isCorrectNetwork: boolean;
  switchToCorrectNetwork: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  currentAccount: null,
  isConnecting: false,
  chainId: null,
  connectWallet: async () => {},
  checkIfWalletIsConnected: async () => {},
  isCorrectNetwork: false,
  switchToCorrectNetwork: async () => {},
});

// Sepolia testnet chain ID
const CORRECT_CHAIN_ID = '0xaa36a7'; // 11155111 in decimal

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState<string | null>(null);

  // Check if connected to the correct network (Sepolia testnet)
  const isCorrectNetwork = chainId === CORRECT_CHAIN_ID;

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.log('Make sure you have MetaMask installed!');
        return;
      }

      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      setChainId(chainId);

      // Add listeners for chain and account changes
      ethereum.on('chainChanged', (chainId: string) => {
        setChainId(chainId);
        window.location.reload();
      });

      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount(null);
        }
      });

      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
        console.log('Found an authorized account:', accounts[0]);
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      const { ethereum } = window as any;

      if (!ethereum) {
        toast.error('Get MetaMask to connect your wallet!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
      toast.success('Wallet connected successfully!');
      
      // Get the chain ID
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      setChainId(chainId);
      
      // If not on Sepolia, prompt to switch
      if (chainId !== CORRECT_CHAIN_ID) {
        toast.error('Please switch to the Sepolia testnet');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      // Check for user rejection (code 4001)
      if (error.code === 4001) {
        toast.error('Connection rejected. Please approve the MetaMask connection request.');
      } else {
        toast.error('Failed to connect wallet. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const switchToCorrectNetwork = useCallback(async () => {
    try {
      const { ethereum } = window as any;
      
      if (!ethereum) {
        toast.error('MetaMask is not installed');
        return;
      }
      
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CORRECT_CHAIN_ID }],
        });
      } catch (error: any) {
        // This error code means the chain has not been added to MetaMask
        if (error.code === 4902) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: CORRECT_CHAIN_ID,
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'SEP',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.sepolia.org'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/'],
              },
            ],
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to switch network');
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        currentAccount,
        isConnecting,
        chainId,
        connectWallet,
        checkIfWalletIsConnected,
        isCorrectNetwork,
        switchToCorrectNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
