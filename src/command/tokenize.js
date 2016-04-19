function tokenize (str) {
    var tokens = [];
    var k, i, temp;
    var strLen = str.length;

    for (i = 0; i < strLen; i++) {
        if (str[i] === '\"') {
            // Keep reading chars until
            for (temp = [], k = i+1; k < strLen && str[k] !== '\"'; k++) {
                temp.push(str[k]);
            }
            tokens.push(temp.join(''));
            i = k+1;
        }

        if (str[i] === '\'') {
            // Keep reading chars until
            for (temp = [], k = i+1; k < strLen && str[k] !== '\''; k++) {
                temp.push(str[k]);
            }
            tokens.push(temp.join(''));
            i = k+1;
        }

        if (str[i] && str[i] !== ' ') {
            // Keep reading chars until
            for (temp = [], k = i; k < strLen && str[k] !== ' '; k++) {
                temp.push(str[k]);
            }
            tokens.push(temp.join(''));
            i = k;
        }
    }

    return tokens;
}

module.exports = tokenize;