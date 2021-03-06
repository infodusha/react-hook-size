import React from 'react';

interface Size {
    readonly width: number | null;
    readonly height: number | null;
}

/**
 * `useSize` returns a size object with `.width` and `.height` properties.
 * On first render their values are `null`.
 *
 * @version 16.8.0
 * @see https://github.com/infodusha/react-hook-size#readme
 */
export function useSize<T>(ref: React.MutableRefObject<T>): Size;
