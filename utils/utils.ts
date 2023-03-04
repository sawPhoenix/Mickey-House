export function sleep<T>(t: number) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(resolve, t);
  });
}
