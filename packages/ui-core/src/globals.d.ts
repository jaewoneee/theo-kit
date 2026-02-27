// Timer functions available in all JS environments (browser, Node.js, React Native)
// Declared here because we exclude "DOM" lib to prevent browser API usage
declare function setTimeout(callback: () => void, ms?: number): ReturnType<typeof setTimeout>;
declare function clearTimeout(id: ReturnType<typeof setTimeout>): void;
declare function setInterval(callback: () => void, ms?: number): ReturnType<typeof setInterval>;
declare function clearInterval(id: ReturnType<typeof setInterval>): void;
