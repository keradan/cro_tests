let test_path = test_info.client + "/" + test_info.file_name + ".js";
let v = Math.floor(Date.now() / 1000);
let script = document.createElement("script");
script.setAttribute("src", "https://keradan.github.io/cro_tests/" + test_path + "?v=" + v);
document.querySelector("head").append(script);