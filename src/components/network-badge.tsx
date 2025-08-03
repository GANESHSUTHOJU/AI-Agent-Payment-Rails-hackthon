import { Badge } from '@/components/ui/badge';

export function NetworkBadge() {
  return <Badge variant="purple">Monad Testnet</Badge>;
}

// Uncomment for dynamic version
// import { useEffect, useState } from 'react';
// export function NetworkBadge() {
//   const [chainId, setChainId] = useState<number | null>(null);
//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.request({ method: 'eth_chainId' }).then((id: string) => {
//         setChainId(parseInt(id, 16));
//       });
//     }
//   }, []);
//   const isMonadTestnet = chainId === 11235; // Replace with actual Monad Testnet Chain ID
//   return (
//     <Badge variant={isMonadTestnet ? 'purple' : 'destructive'}>
//       {isMonadTestnet ? 'Monad Testnet' : 'Wrong Network'}
//     </Badge>
//   );
// } 