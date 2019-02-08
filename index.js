let { useState, useEffect, useRef } = require('react');

let RObserver = window.ResizeObserver || require('resize-observer-polyfill').default;

module.exports.useSize = function useSize(ref) {
    
    let ro = useRef();
    let [inited, setInited] = useState(false);
    let [size, setSize] = useState({ width: null, height: null });
    
    let init = () => setInited(true);

    useEffect(() => {
        ro.current = new RObserver(entries => {
            let { width, height } = entries[0].contentRect;
            if(size.width !== width || size.height !== height)
                setSize({ width, height });
        });
        window.setTimeout(init, 0);
        return () => ro.current.disconnect();
    }, []);

    useEffect(() => {
        ro.current.observe(ref.current);
    }, [inited]);

    return size;

}
