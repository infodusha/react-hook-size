const { useState, useEffect, useRef } = require('react');

const RObserver = window.ResizeObserver || require('resize-observer-polyfill').default;

module.exports.useSize = function useSize(ref) {

    const obs = useRef();
    const [ignored, setIgnored] = useState(0);
    const [size, setSize] = useState({ width: null, height: null });

    const forceUpdate = () => setIgnored((c) => c + 1);

    useEffect(() => {
        function observe(entries) {
            const { width, height } = entries[0].contentRect;
            setSize((s) => s.width !== width || s.height !== height ? { width, height } : s);
        }
        obs.current = new RObserver(observe);
        return () => obs.current.disconnect();
    }, []);

    useEffect(() => {
        const item = ref.current;
        if(item) {
            obs.current.observe(item);
            window.setTimeout(forceUpdate, 0);
        }
        return () => item && obs.current.unobserve(item);
    }, [obs, ref]);

    return size;

}
