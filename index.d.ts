import React from 'react';

declare module 'react-hook-size' {
    interface size {
        width: number | null;
        height: number | null;
    }
    function useSize<T = undefined>(ref: React.MutableRefObject<T | undefined>): size;
    export = useSize;
}