declare let window: any;

function useSolana() {
  let solana;
  if (typeof window !== "undefined") {
    solana = window.solana;
  }

  return solana;
}

export default useSolana;
