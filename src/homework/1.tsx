import React, { useEffect, useRef } from "react";

// Опишіть Props
type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
};
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип

    class Options {
      rootMargin: string;
      threshold: number;
      root: null;

      constructor(rootMargin: string, threshold: number, root: null) {
        this.rootMargin = rootMargin;
        this.threshold = threshold;
        this.root = root;
      }
    }

    const options = new Options("0px", 1.0, null);

    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    //   root: null,
    // };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
