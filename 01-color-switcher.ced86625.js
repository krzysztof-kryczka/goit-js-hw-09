!function(){var t=null,e={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};function n(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}e.stopBtn.setAttribute("disabled",!0),e.startBtn.addEventListener("click",(function(r){!0,r.target.setAttribute("disabled",!0),e.stopBtn.removeAttribute("disabled"),t=setInterval(n,1e3)})),e.stopBtn.addEventListener("click",(function(n){!1,n.target.setAttribute("disabled",!0),e.startBtn.removeAttribute("disabled"),clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.ced86625.js.map