console.log('執行script 1- defer', new Date().toLocaleTimeString());


document.addEventListener("DOMContentLoaded", function () {
    // note：這個事件在 DOM 完全被加載和解析之後被觸發，而無需等待樣式表、圖片或子框架的完全載入。

    const lazyImages = document.querySelectorAll('img.lazy');
    // note：取得html中，在class有標記為「lazy」的圖片DOM

    if ('IntersectionObserver' in window) {
        // note：檢查瀏覽器是否支援IntersectionObserver API
        const imageObserver = new IntersectionObserver((entries, observer) => {
            // note:
            // 1. 程式碼會創建一個新的 IntersectionObserver 實例，並設置監聽回呼函數。
            // 2. 回呼函數會接收一組 entries（被監測的元素列表）和 observer（當前觀察器）

            entries.forEach(entry => {
                // note：遍歷 entries，檢查哪些元素進入了視口

                if (entry.isIntersecting) {
                    const img = entry.target;

                    // 將img的src屬性設定為data-src的值
                    img.src = img.dataset.src;

                    // 取消觀察該元素，因為已經載入
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                };
            });
        });

        // 將每一張帶有 lazy class 的圖片加入 IntersectionObserver 以進行觀察。
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    };
});
