const GetBracketContentLeft = (text, startIndex) => {
    var bracketId = 0;

    for (var a = startIndex; a > 0; a--) {
        if (text.charAt(a) == ')')
            bracketId++;
        else if (text.charAt(a) == '(') {
            bracketId--;
            if (bracketId == 0)
                return [text.substring(a + 1, startIndex), a + 1];
        }
    }
}

const GetBracketContentRight = (text, startIndex) => {
    var bracketId = 0;

    for (var a = startIndex; a < text.length; a++) {
        if (text.charAt(a) == '(')
            bracketId++;
        else if (text.charAt(a) == ')') {
            bracketId--;
            if (bracketId == 0)
                return [text.substring(startIndex + 1, a), a+1];
        }
    }
}

const RightSide = (text, startIndex) => {
    var validChars = "1234567890.";

    if (text.charAt(startIndex + 1) == '(') {
        return GetBracketContentRight(text, startIndex + 1);
    }
    else {
        var rightIndex = startIndex + 1;
        var right = "";

        for (var a = startIndex + 1; a < text.length; a++) {
            if (validChars.includes(text.charAt(a)))
                right = right + text.charAt(a);
            else {
                rightIndex = a;
                break;
            }
        }

        return [right, rightIndex];
    }
}

const LeftSide = (text, startIndex) => {
    var validChars = "1234567890.";

    if (text.charAt(startIndex - 1) == ')') {
        return GetBracketContentLeft(text, startIndex - 1);
    }
    else {
        var leftIndex = -1;
        var left = "";

        for (var a = startIndex - 1; a >= 0; a--) {
            if (validChars.includes(text.charAt(a)))
                left = text.charAt(a) + left;
            else
                {
                    leftIndex = a;
                    break;
                }
        }

        return [left, leftIndex];
    }
}

export { GetBracketContentLeft, GetBracketContentRight, LeftSide, RightSide }