const { useState, useEffect, useMemo } = require('react');

const RObserver = window.ResizeObserver || require('resize-observer-polyfill').default;

module.exports.useSize = function useSize(ref) {

    const [ignored, setIgnored] = useState(0);
    const [size, setSize] = useState({ width: Infinity, height: Infinity });

    const forceUpdate = () => setIgnored((c) => c + 1);

    const obs = useMemo(() => new RObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize((s) => s.width !== width || s.height !== height ? { width, height } : s);
    }), []);

    useEffect(() => {
        const item = ref.current;
        if (item) {
            obs.observe(item);
            window.setTimeout(forceUpdate, 0);
        }
        return () => item && obs.unobserve(item);
    }, [obs, ref]);

    return size;

}
