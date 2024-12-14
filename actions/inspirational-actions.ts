const url = "https://positivity-tips.p.rapidapi.com/api/positivity/quote";
const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "2d10ace6efmshd38029045278322p10a075jsn812b5c327913",
        "x-rapidapi-host": "positivity-tips.p.rapidapi.com"
    }
};

export function getInspirationalQuote() {
    return fetch(url, options)
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
}
