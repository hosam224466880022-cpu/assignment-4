/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    // لو المصفوفة فاضية
    if (strs.length === 0) return "";

    // نعتبر أول كلمة هي الـ prefix المبدئي
    let prefix = strs[0];

    // نقارن الـ prefix مع باقي الكلمات
    for (let i = 1; i < strs.length; i++) {
        // طول ما الكلمة الحالية لا تبدأ بالـ prefix
        while (strs[i].indexOf(prefix) !== 0) {
            // نقلل الـ prefix حرف
            prefix = prefix.substring(0, prefix.length - 1);

            // لو الـ prefix بقى فاضي
            if (prefix === "") return "";
        }
    }

    return prefix;
};
console.log(longestCommonPrefix(["flower","flow","flight"]));
// الناتج: "fl"

console.log(longestCommonPrefix(["dog","racecar","car"]));
// الناتج: ""
