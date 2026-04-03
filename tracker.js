/**
 * Sovereign Analytics Tracker v1.2 (Cookie-less & Auto-Capture)
 * Tracks: Pageviews, Clicks, Forms, and HTML5 Video.
 */
(async () => {
    const TRACKER_ENDPOINT = import.meta.env.VITE_TRACKER_ENDPOINT;
    const TRACKER_API_KEY = import.meta.env.VITE_TRACKER_API_KEY;

    const CONFIG = {
        endpoint: TRACKER_ENDPOINT,
        apiKey: TRACKER_API_KEY,
        // Only track these elements to keep data clean
        trackableElements: ["BUTTON", "A", "INPUT", "SUBMIT", "SELECT"]
    };

    if (!CONFIG.endpoint || !CONFIG.apiKey) {
        console.warn("Tracker disabled: missing VITE_TRACKER_ENDPOINT or VITE_TRACKER_API_KEY");
        return;
    }

    // START DEMO EXTRAS (Remove in production)

    const createToastContainer = () => {
        const container = document.createElement("div");
        container.id = "sa-toast-container";
        container.style.position = "fixed";
        container.style.right = "16px";
        container.style.bottom = "16px";
        container.style.zIndex = "99999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "8px";
        container.style.maxWidth = "360px";
        container.style.pointerEvents = "none";
        document.body.appendChild(container);
        return container;
    };

    const showSuccessToast = (payload) => {
        const container = document.getElementById("sa-toast-container") || createToastContainer();
        const toast = document.createElement("div");
        toast.style.background = "rgba(15, 23, 42, 0.95)";
        toast.style.color = "#f8fafc";
        toast.style.borderRadius = "8px";
        toast.style.padding = "10px 12px";
        toast.style.fontSize = "12px";
        toast.style.lineHeight = "1.4";
        toast.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        toast.style.boxShadow = "0 8px 20px rgba(2, 6, 23, 0.35)";
        toast.style.whiteSpace = "pre-wrap";
        toast.style.wordBreak = "break-word";

        const payloadString = JSON.stringify(payload, null, 2);
        const truncatedPayload = payloadString.length > 700
            ? `${payloadString.slice(0, 700)}\n...`
            : payloadString;

        toast.textContent = `POST /v1/event succeeded\n${truncatedPayload}`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = "opacity 180ms ease";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 180);
        }, 3500);
    };

    // END DEMO EXTRAS (Keep the above code for testing, remove in production)

    // 1. Core Tracking Function
    const track = async (eventName, metadata = {}) => {
        const payload = {
            api_key: CONFIG.apiKey,
            event_name: eventName,
            url: window.location.href,
            properties: {
                referrer: document.referrer || null,
                screen_res: `${window.screen.width}x${window.screen.height}`,
                ...metadata // Merges specific event data (like video progress)
            }
        };

        // Use keepalive to ensure the request finishes if the user navigates away
        fetch(CONFIG.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
        })
            .then((response) => {
                if (response.ok) showSuccessToast(payload);
            })
            .catch(() => {}); // Silent fail to not interrupt user experience
    };

    // 2. Helper: Get unique CSS selector for the "Visual Tagger"
    const getSelector = (el) => {
        if (!el || el.nodeType !== 1) return "";
        const parts = [];
        while (el.parentNode) {
            let tag = el.tagName.toLowerCase();
            if (el.id) {
                parts.unshift(`${tag}#${el.id}`);
                break;
            }
            let index = Array.from(el.parentNode.children).indexOf(el) + 1;
            parts.unshift(`${tag}:nth-child(${index})`);
            el = el.parentNode;
        }
        return parts.join(" > ");
    };

    // 3. EVENT: Pageview
    track("pageview");

    // 4. EVENT: Clicks (Auto-Capture)
    window.addEventListener("click", (e) => {
        const target = e.target.closest(CONFIG.trackableElements.join(","));
        if (target) {
            track("click", {
                element_text: target.innerText?.trim().substring(0, 50),
                selector: getSelector(target),
                type: target.tagName.toLowerCase()
            });
        }
    }, true);

    // 5. EVENT: Video Interactions (HTML5 Video)
    const setupVideoTracking = (video) => {
        if (video.dataset.saTracked) return;
        video.dataset.saTracked = "true";

        const explicitVideoName = video.getAttribute("data-sa-video-name") || video.getAttribute("title");
        const resolvedVideoSrc = video.currentSrc || video.src || video.getAttribute("src") || "";
        const parsedVideoName = resolvedVideoSrc.split('/').pop();
        const videoName = explicitVideoName || parsedVideoName || "unknown_video";

        video.addEventListener("play", () => track("video_play", { video_name: videoName }));
        video.addEventListener("pause", () => {
            // Only track pause if not at the end
            if (video.currentTime < video.duration) {
                track("video_pause", { 
                    video_name: videoName, 
                    timestamp_secs: Math.round(video.currentTime) 
                });
            }
        });
        video.addEventListener("ended", () => track("video_complete", { video_name: videoName }));
    };

    // Auto-discover existing and future videos
    const initVideoTracking = () => {
        if (!document.body) return;

        const videoObserver = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                m.addedNodes.forEach((node) => {
                    if (node.tagName === "VIDEO") setupVideoTracking(node);
                    if (node.querySelectorAll) node.querySelectorAll("video").forEach(setupVideoTracking);
                });
            });
        });

        videoObserver.observe(document.body, { childList: true, subtree: true });
        document.querySelectorAll("video").forEach(setupVideoTracking);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVideoTracking, { once: true });
    } else {
        initVideoTracking();
    }

})();