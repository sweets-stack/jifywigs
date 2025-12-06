// Fixes: "Cannot find namespace 'React'", "JSX element implicitly has type 'any'"
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};