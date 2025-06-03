import { useEffect } from "react";

export function useRecaptchaScript(siteKey: string) {
    useEffect(() => {
        const scriptId = "recaptcha-v3-script";

        if (document.getElementById(scriptId)) return;

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        document.body.appendChild(script);
    }, [siteKey]);
}
