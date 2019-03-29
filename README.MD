## Instalation

`npm i react-hook-size --save`

## Why this hook is the best?
* Rerenders after mount to get size
* Uses ResizeObserver(or ponyfill)

## Usage

```javascript
import React, { useRef } from 'react';
import { useSize } from 'react-hook-size';

export default function Example() {
    
    let style = {
        width: '100%',
        height: '100%',
    };
    let ref = useRef();
    let { width, height } = useSize(ref);

    return (
        <div ref={ref} style={style}>
            <h1>W: {width}, H: {height}</h1>
        </div>
    );
}

```