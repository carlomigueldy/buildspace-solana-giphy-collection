declare let window: any;

export function useSolana() {
  let solana;
  if (typeof window !== "undefined") {
    solana = window.solana;
  }

  return solana;
}
