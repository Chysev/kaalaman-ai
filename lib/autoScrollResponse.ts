const scrollToBottom = (containerRef: React.RefObject<HTMLDivElement>) => {
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
};

export default scrollToBottom;
