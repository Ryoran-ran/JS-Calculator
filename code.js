let BolPush = new Array(10);
let Memory_NUM = 0;
let Memory_Ans_num = 0;
let Calc_mode = 0;
let flg_change = false;
let flg_equal = false;
let Calc_count = 0;
let Memory_storage = 0;
let Num_answer = 0;
let Command_Recall = "";

let CASIO_COMAND = {
     NUM_1: false
    ,NUM_3: false
    ,NUM_7: false
    ,NUM_9: false
    ,KEY_DELETE: false
}

//四則演算
const plus = 1;
const minu = 2;
const timm = 3;
const divi = 4;
//四則演算以外
const Inde = 5;
const Loga = 6;
const Modd = 7;
const Perm = 8;
const Comb = 9;

//メモリー
const modeMemoryStore = -1;

//四則演算
const Modeplus = "plus";
const Modeminu = "minu";
const Modetimm = "timm";
const Modedivi = "divi";
//四則演算以外
const ModeInde = "Inde";
const ModeLoga = "Loga";
const ModeModd = "Modd";
const ModePerm = "Perm";
const ModeComb = "Comb";

//三角関数
const tri_sin = 11;
const tri_cos = 12;
const tri_tan = 13;
//逆三角関数
const tri_arcsin = 21;
const tri_arccos = 22;
const tri_arctan = 23;
//1/三角関数
const tri_sec = 31;
const tri_csc = 32;
const tri_cot = 33;
//双曲線関数
const tri_sinh = 41;
const tri_cosh = 42;
const tri_tanh = 43;
//逆双曲線関数
const tri_arcsinh = 51;
const tri_arccosh = 52;
const tri_arctanh = 53;

//単位換算
// [長さ]
const unit_km    = 101;
const unit_m     = 102;
const unit_Cm    = 103;
const unit_mm    = 104;
const unit_inch  = 105;
const unit_Feet  = 106;
const unit_yard  = 107;
const unit_mile  = 108;

// [体積]
const unit_mmm   = 201;
const unit_Cmmm  = 202;
const unit_L     = 203;
const unit_mL    = 204;
const unit_gal   = 205;

// [時間]
const unit_day     = 301;
const unit_hour    = 302;
const unit_minute  = 303;
const unit_second  = 304;

// [容量]
const unit_bit   = 401;
const unit_byte  = 402;
const unit_KB    = 403;
const unit_MB    = 404;
const unit_GB    = 405;
const unit_TB    = 406;

// [温度]
const unit_C   = 501;
const unit_F   = 502;
const unit_K   = 503;

//[角度]
const unit_deg = 601;
const unit_rad = 602;

// ===== 視覚エフェクト用ユーティリティ =====
const WRAPPER_ID = "calculator-wrapper";

// 補助：チェック有無の安全判定
const isChecked = el => !!(el && el.checked);

//コマンド候補
const commandList = [
    { cmd: "M", desc: "+:メモリーに加算｜-:メモリーを減算" },
    { cmd: "I", desc: "1を入力します" },
    { cmd: "II", desc: "2を入力します" },
    { cmd: "III", desc: "3を入力します" },
    { cmd: "IV", desc: "4を入力します(5-1)" },
    { cmd: "IIII", desc: "4を入力します(1+1+1+1)" },
    { cmd: "V", desc: "5を入力します" },
    { cmd: "VI", desc: "6を入力します" },
    { cmd: "VII", desc: "7を入力します" },
    { cmd: "VIII", desc: "8を入力します" },
    { cmd: "IX", desc: "9を入力します(10-1)" },
    { cmd: "VIIII", desc: "9を入力します(5+1+1+1+1)" },
    { cmd: "X", desc: "10を入力します" },
    { cmd: "_", desc: "0を入力します" },
    { cmd: "ZERO", desc: "ZEROを入力します" },
    { cmd: "SQUARED", desc: "数字を2乗します" },
    { cmd: "^II", desc: "数字を2乗します" },
    { cmd: "SQRT", desc: "数字の平方根を計算します。" },
    { cmd: "ROOT", desc: "√って根(root)が語源らしいです" },
    { cmd: "FACTORIAL", desc: "階乗の計算をします" },
    { cmd: "!", desc: "びっくりするくらい大きな数になります" },
    { cmd: "DICE", desc: "サイコロを振ります" },
    { cmd: "SAIKORO", desc: "DICEがかけない人向け" },
    { cmd: "[]", desc: "小数点以下を切り捨てます" },
    { cmd: "[X]", desc: "ガウス記号の計算をします" },
    { cmd: "FLOOR", desc: "床関数といいます" },
    { cmd: "LOG", desc: "常用対数で計算します" },
    { cmd: "LOGX", desc: "X=10です" },
    { cmd: "LN", desc: "自然対数で計算します" },
    { cmd: "LOGE", desc: "Eはネイピア数です" },
    { cmd: "EXP", desc: "ネイピア数^数字の計算をします。" },
    { cmd: "EXPONENTIAL", desc: "eはexp表記もできます。" },
    { cmd: "^", desc: "累乗の計算をします" },
    { cmd: "POW", desc: "JSでは「**」でも累乗になります" },
    { cmd: "POWER", desc: "パワー！ヤー！" },
    { cmd: "LOGYX", desc: "Y(2つ目の数字)が底の対数の計算をします" },
    { cmd: "MOD", desc: "あまりの計算をします" },
    { cmd: "POWX", desc: "10の階乗の計算をします。数字は指数側です" },
    { cmd: "POWERX", desc: "桁数を設定します" },
    { cmd: "X^", desc: "X=10の計算です" },
    { cmd: "^X", desc: "すで算計の01=X" },
    { cmd: "P", desc: "順列の計算をします" },
    { cmd: "NPR", desc: "nPrの計算をします" },
    { cmd: "PERMUTATION", desc: "パーテーションをします" },
    { cmd: "C", desc: "組み合わせの計算をします" },
    { cmd: "NCR", desc: "nCrの計算をします" },
    { cmd: "COMBINATION", desc: "" },
    { cmd: "[I", desc: "逆数の計算をします" },
    { cmd: "]I", desc: "「/」が使えないので苦肉の策です" },
    { cmd: "[I]", desc: "一応逆数の計算コマンドです" },
    { cmd: "|I", desc: "垂直ですが、分数のつもりです" },
    { cmd: "I|", desc: "I=-1です" },
    { cmd: "RECIPROCAL", desc: "逆数の計算をします" },
    { cmd: "PI", desc: "円周率(π)の計算をします" },
    { cmd: "SIN", desc: "SINの計算をします" },
    { cmd: "COS", desc: "COSの計算をします" },
    { cmd: "TAN", desc: "TANの計算をします" },
    { cmd: "ARCSIN", desc: "SINの逆三角関数の計算をします" },
    { cmd: "ARCCOS", desc: "COSの逆三角関数の計算をします" },
    { cmd: "ARCTAN", desc: "TANの逆三角関数の計算をします" },
    { cmd: "ASIN", desc: "SINの逆三角関数の計算をします" },
    { cmd: "ACOS", desc: "COSの逆三角関数の計算をします" },
    { cmd: "ATAN", desc: "TANの逆三角関数の計算をします" },
    { cmd: "SEC", desc: "1/SINの計算をします" },
    { cmd: "CSC", desc: "1/COSの計算をします" },
    { cmd: "COT", desc: "1/TANの計算をします" },
    { cmd: "SINH", desc: "SINH(双曲線関数)の計算をします" },
    { cmd: "COSH", desc: "COSH(双曲線関数)の計算をします" },
    { cmd: "TANH", desc: "TANH(双曲線関数)の計算をします" },
    { cmd: "ARCSINH", desc: "SINH(双曲線関数)の逆三角関数の計算をします" },
    { cmd: "ARCCOSH", desc: "COSH(双曲線関数)の逆三角関数の計算をします" },
    { cmd: "ARCTANH", desc: "TANH(双曲線関数)の逆三角関数の計算をします" },
    { cmd: "ASINH", desc: "SINH(双曲線関数)の逆三角関数の計算をします" },
    { cmd: "ACOSH", desc: "COSH(双曲線関数)の逆三角関数の計算をします" },
    { cmd: "ATANH", desc: "TANH(双曲線関数)の逆三角関数の計算をします" },
    { cmd: "MEMORYPLUS", desc: "メモリーに加算します" },
    { cmd: "MPLUS", desc: "メモリーに値を追加します" },
    { cmd: "MEMORYMINUS", desc: "メモリーに減算します" },
    { cmd: "MMINUS", desc: "メモリーに値を少なくします" },
    { cmd: "MC", desc: "メモリーを削除します" },
    { cmd: "MEMORYCLEAR", desc: "二度と戻れない" },
    { cmd: "MR", desc: "メモリーの値を入力します" },
    { cmd: "MEMORYRECALL", desc: "メモリー開放！！" },
    { cmd: "MEMORYSTORE", desc: "メモリーの値を書き換えます" },
    { cmd: "MS", desc: "ボタンの都合でコマンドのみです" },
    { cmd: "THOUSAND", desc: "1,000を入力します" },
    { cmd: "MILLION", desc: "1,000,000を入力します" },
    { cmd: "PLUSMINUS", desc: "+/-を入れ替えます" },
    { cmd: "CLEAR", desc: "表示分の数字のみをクリアします" },
    { cmd: "ALLCLEAR", desc: "計算内容をリセットします" },
    { cmd: "COMMANDCLOSE", desc: "コマンド欄を閉じます" },
    { cmd: "CLOSE", desc: "「↓」入力でコマンド欄を表示できます。" },
    { cmd: "SETTINGCOMMAND", desc: "コマンド欄が非表示になります" },
    { cmd: "MEMORYDISPLAY", desc: "メモリーの値を表示・非表示にします。" },
    { cmd: "SETTINGMEMORY", desc: "メモリーの値の表示の設定を変更ができます" },
    { cmd: "SETTINGROUND", desc: "小数点10桁以降の表示の設定ができます" },
    { cmd: "FUNCTIONDISPLAY", desc: "関数ボタンの表示の設定ができます" },
    { cmd: "SETTINGFUNCTION", desc: "関数ボタンはコマンドで代用できます" },
    { cmd: "SETTINGNAN", desc: "NaNの表示を変更します(Infinityも)" },
    { cmd: "INFINITYNAN", desc: "InfinityとNaNの表示を変更します" },
    { cmd: "NANINFINITY", desc: "NaNとInfinityの表示を変更します" },
    { cmd: "SETTINGERROR", desc: "エラー表示の変更をします" },
    { cmd: "SETTINGBUTTON", desc: "ボタン表示の変更をします" },
    { cmd: "BUTTONDISPLAY", desc: "ボタンはキーボードで代用できます" },
    { cmd: "SETTINGDEG", desc: "角度の計算単位変更をします" },
    { cmd: "SETTINGRAD", desc: "角度の計算単位変更をします" },
    { cmd: "SETTINGINFINITY", desc: "1.00e+15より大きい値をInfinity表示します" },
    { cmd: "SETTINGZERO", desc: "1.00e-15より小さい値を0表示します" },
    { cmd: "SETTINGOPEN", desc: "⚙️ 設定を開く/閉じるを開きます" },
    { cmd: "SETTINGCLOSE", desc: "⚙️ 設定を開く/閉じるを閉じます" },
    { cmd: "KM→M", desc: "キロメートルをメートルに変換します" },
    { cmd: "KM>M", desc: "キロメートルをメートルに変換します" },
    { cmd: "KM→CM", desc: "キロメートルをセンチメートルに変換します" },
    { cmd: "KM>CM", desc: "キロメートルをセンチメートルに変換します" },
    { cmd: "KM→MM", desc: "キロメートルをミリメートルに変換します" },
    { cmd: "KM>MM", desc: "キロメートルをミリメートルに変換します" },
    { cmd: "KM→INCH", desc: "キロメートルをインチに変換します" },
    { cmd: "KM>INCH", desc: "キロメートルをインチに変換します" },
    { cmd: "KM→FEET", desc: "キロメートルをフィートに変換します" },
    { cmd: "KM>FEET", desc: "キロメートルをフィートに変換します" },
    { cmd: "KM→YARD", desc: "キロメートルをヤードに変換します" },
    { cmd: "KM>YARD", desc: "キロメートルをヤードに変換します" },
    { cmd: "KM→MILE", desc: "キロメートルをマイルに変換します" },
    { cmd: "KM>MILE", desc: "キロメートルをマイルに変換します" },
    { cmd: "M→KM", desc: "メートルをキロメートルに変換します" },
    { cmd: "M>KM", desc: "メートルをキロメートルに変換します" },
    { cmd: "M→CM", desc: "メートルをセンチメートルに変換します" },
    { cmd: "M>CM", desc: "メートルをセンチメートルに変換します" },
    { cmd: "M→MM", desc: "メートルをミリメートルに変換します" },
    { cmd: "M>MM", desc: "メートルをミリメートルに変換します" },
    { cmd: "M→INCH", desc: "メートルをインチに変換します" },
    { cmd: "M>INCH", desc: "メートルをインチに変換します" },
    { cmd: "M→FEET", desc: "メートルをフィートに変換します" },
    { cmd: "M>FEET", desc: "メートルをフィートに変換します" },
    { cmd: "M→YARD", desc: "メートルをヤードに変換します" },
    { cmd: "M>YARD", desc: "メートルをヤードに変換します" },
    { cmd: "M→MILE", desc: "メートルをマイルに変換します" },
    { cmd: "M>MILE", desc: "メートルをマイルに変換します" },
    { cmd: "CM→KM", desc: "センチメートルをキロメートルに変換します" },
    { cmd: "CM>KM", desc: "センチメートルをキロメートルに変換します" },
    { cmd: "CM→M", desc: "センチメートルをメートルに変換します" },
    { cmd: "CM>M", desc: "センチメートルをメートルに変換します" },
    { cmd: "CM→MM", desc: "センチメートルをミリメートルに変換します" },
    { cmd: "CM>MM", desc: "センチメートルをミリメートルに変換します" },
    { cmd: "CM→INCH", desc: "センチメートルをインチに変換します" },
    { cmd: "CM>INCH", desc: "センチメートルをインチに変換します" },
    { cmd: "CM→FEET", desc: "センチメートルをフィートに変換します" },
    { cmd: "CM>FEET", desc: "センチメートルをフィートに変換します" },
    { cmd: "CM→YARD", desc: "センチメートルをヤードに変換します" },
    { cmd: "CM>YARD", desc: "センチメートルをヤードに変換します" },
    { cmd: "CM→MILE", desc: "センチメートルをマイルに変換します" },
    { cmd: "CM>MILE", desc: "センチメートルをマイルに変換します" },
    { cmd: "MM→KM", desc: "ミリメートルをキロメートルに変換します" },
    { cmd: "MM>KM", desc: "ミリメートルをキロメートルに変換します" },
    { cmd: "MM→M", desc: "ミリメートルをメートルに変換します" },
    { cmd: "MM>M", desc: "ミリメートルをメートルに変換します" },
    { cmd: "MM→CM", desc: "ミリメートルをセンチメートルに変換します" },
    { cmd: "MM>CM", desc: "ミリメートルをセンチメートルに変換します" },
    { cmd: "MM→INCH", desc: "ミリメートルをインチに変換します" },
    { cmd: "MM>INCH", desc: "ミリメートルをインチに変換します" },
    { cmd: "MM→FEET", desc: "ミリメートルをフィートに変換します" },
    { cmd: "MM>FEET", desc: "ミリメートルをフィートに変換します" },
    { cmd: "MM→YARD", desc: "ミリメートルをヤードに変換します" },
    { cmd: "MM>YARD", desc: "ミリメートルをヤードに変換します" },
    { cmd: "MM→MILE", desc: "ミリメートルをマイルに変換します" },
    { cmd: "MM>MILE", desc: "ミリメートルをマイルに変換します" },
    { cmd: "INCH→KM", desc: "インチをキロメートルに変換します" },
    { cmd: "INCH>KM", desc: "インチをキロメートルに変換します" },
    { cmd: "INCH→M", desc: "インチをメートルに変換します" },
    { cmd: "INCH>M", desc: "インチをメートルに変換します" },
    { cmd: "INCH→CM", desc: "インチをセンチメートルに変換します" },
    { cmd: "INCH>CM", desc: "インチをセンチメートルに変換します" },
    { cmd: "INCH→MM", desc: "インチをミリメートルに変換します" },
    { cmd: "INCH>MM", desc: "インチをミリメートルに変換します" },
    { cmd: "INCH→FEET", desc: "インチをフィートに変換します" },
    { cmd: "INCH>FEET", desc: "インチをフィートに変換します" },
    { cmd: "INCH→YARD", desc: "インチをヤードに変換します" },
    { cmd: "INCH>YARD", desc: "インチをヤードに変換します" },
    { cmd: "INCH→MILE", desc: "インチをマイルに変換します" },
    { cmd: "INCH>MILE", desc: "インチをマイルに変換します" },
    { cmd: "FEET→KM", desc: "フィートをキロメートルに変換します" },
    { cmd: "FEET>KM", desc: "フィートをキロメートルに変換します" },
    { cmd: "FEET→M", desc: "フィートをメートルに変換します" },
    { cmd: "FEET>M", desc: "フィートをメートルに変換します" },
    { cmd: "FEET→CM", desc: "フィートをセンチメートルに変換します" },
    { cmd: "FEET>CM", desc: "フィートをセンチメートルに変換します" },
    { cmd: "FEET→MM", desc: "フィートをミリメートルに変換します" },
    { cmd: "FEET>MM", desc: "フィートをミリメートルに変換します" },
    { cmd: "FEET→INCH", desc: "フィートをインチに変換します" },
    { cmd: "FEET>INCH", desc: "フィートをインチに変換します" },
    { cmd: "FEET→YARD", desc: "フィートをヤードに変換します" },
    { cmd: "FEET>YARD", desc: "フィートをヤードに変換します" },
    { cmd: "FEET→MILE", desc: "フィートをマイルに変換します" },
    { cmd: "FEET>MILE", desc: "フィートをマイルに変換します" },
    { cmd: "YARD→KM", desc: "ヤードをキロメートルに変換します" },
    { cmd: "YARD>KM", desc: "ヤードをキロメートルに変換します" },
    { cmd: "YARD→M", desc: "ヤードをメートルに変換します" },
    { cmd: "YARD>M", desc: "ヤードをメートルに変換します" },
    { cmd: "YARD→CM", desc: "ヤードをセンチメートルに変換します" },
    { cmd: "YARD>CM", desc: "ヤードをセンチメートルに変換します" },
    { cmd: "YARD→MM", desc: "ヤードをミリメートルに変換します" },
    { cmd: "YARD>MM", desc: "ヤードをミリメートルに変換します" },
    { cmd: "YARD→INCH", desc: "ヤードをインチに変換します" },
    { cmd: "YARD>INCH", desc: "ヤードをインチに変換します" },
    { cmd: "YARD→FEET", desc: "ヤードをフィートに変換します" },
    { cmd: "YARD>FEET", desc: "ヤードをフィートに変換します" },
    { cmd: "YARD→MILE", desc: "ヤードをマイルに変換します" },
    { cmd: "YARD>MILE", desc: "ヤードをマイルに変換します" },
    { cmd: "MILE→KM", desc: "マイルをキロメートルに変換します" },
    { cmd: "MILE>KM", desc: "マイルをキロメートルに変換します" },
    { cmd: "MILE→M", desc: "マイルをメートルに変換します" },
    { cmd: "MILE>M", desc: "マイルをメートルに変換します" },
    { cmd: "MILE→CM", desc: "マイルをセンチメートルに変換します" },
    { cmd: "MILE>CM", desc: "マイルをセンチメートルに変換します" },
    { cmd: "MILE→MM", desc: "マイルをミリメートルに変換します" },
    { cmd: "MILE>MM", desc: "マイルをミリメートルに変換します" },
    { cmd: "MILE→INCH", desc: "マイルをインチに変換します" },
    { cmd: "MILE>INCH", desc: "マイルをインチに変換します" },
    { cmd: "MILE→FEET", desc: "マイルをフィートに変換します" },
    { cmd: "MILE>FEET", desc: "マイルをフィートに変換します" },
    { cmd: "MILE→YARD", desc: "マイルをヤードに変換します" },
    { cmd: "MILE>YARD", desc: "マイルをヤードに変換します" },
    { cmd: "MMM→CMMM", desc: "立方メートルを立方センチメートルに変換します" },
    { cmd: "MMM>CMMM", desc: "立方メートルを立方センチメートルに変換します" },
    { cmd: "MMM→L", desc: "立方メートルをリットルに変換します" },
    { cmd: "MMM>L", desc: "立方メートルをリットルに変換します" },
    { cmd: "MMM→ML", desc: "立方メートルをミリリットルに変換します" },
    { cmd: "MMM>ML", desc: "立方メートルをミリリットルに変換します" },
    { cmd: "MMM→GAL", desc: "立方メートルをガロン（US）に変換します" },
    { cmd: "MMM>GAL", desc: "立方メートルをガロン（US）に変換します" },
    { cmd: "CMMM→MMM", desc: "立方センチメートルを立方メートルに変換します" },
    { cmd: "CMMM>MMM", desc: "立方センチメートルを立方メートルに変換します" },
    { cmd: "CMMM→L", desc: "立方センチメートルをリットルに変換します" },
    { cmd: "CMMM>L", desc: "立方センチメートルをリットルに変換します" },
    { cmd: "CMMM→ML", desc: "立方センチメートルをミリリットルに変換します" },
    { cmd: "CMMM>ML", desc: "立方センチメートルをミリリットルに変換します" },
    { cmd: "CMMM→GAL", desc: "立方センチメートルをガロン（US）に変換します" },
    { cmd: "CMMM>GAL", desc: "立方センチメートルをガロン（US）に変換します" },
    { cmd: "L→MMM", desc: "リットルを立方メートルに変換します" },
    { cmd: "L>MMM", desc: "リットルを立方メートルに変換します" },
    { cmd: "L→CMMM", desc: "リットルを立方センチメートルに変換します" },
    { cmd: "L>CMMM", desc: "リットルを立方センチメートルに変換します" },
    { cmd: "L→ML", desc: "リットルをミリリットルに変換します" },
    { cmd: "L>ML", desc: "リットルをミリリットルに変換します" },
    { cmd: "L→GAL", desc: "リットルをガロン（US）に変換します" },
    { cmd: "L>GAL", desc: "リットルをガロン（US）に変換します" },
    { cmd: "ML→MMM", desc: "ミリリットルを立方メートルに変換します" },
    { cmd: "ML>MMM", desc: "ミリリットルを立方メートルに変換します" },
    { cmd: "ML→CMMM", desc: "ミリリットルを立方センチメートルに変換します" },
    { cmd: "ML>CMMM", desc: "ミリリットルを立方センチメートルに変換します" },
    { cmd: "ML→L", desc: "ミリリットルをリットルに変換します" },
    { cmd: "ML>L", desc: "ミリリットルをリットルに変換します" },
    { cmd: "ML→GAL", desc: "ミリリットルをガロン（US）に変換します" },
    { cmd: "ML>GAL", desc: "ミリリットルをガロン（US）に変換します" },
    { cmd: "GAL→MMM", desc: "ガロン（US）を立方メートルに変換します" },
    { cmd: "GAL>MMM", desc: "ガロン（US）を立方メートルに変換します" },
    { cmd: "GAL→CMMM", desc: "ガロン（US）を立方センチメートルに変換します" },
    { cmd: "GAL>CMMM", desc: "ガロン（US）を立方センチメートルに変換します" },
    { cmd: "GAL→L", desc: "ガロン（US）をリットルに変換します" },
    { cmd: "GAL>L", desc: "ガロン（US）をリットルに変換します" },
    { cmd: "GAL→ML", desc: "ガロン（US）をミリリットルに変換します" },
    { cmd: "GAL>ML", desc: "ガロン（US）をミリリットルに変換します" },
    { cmd: "DAY→HOUR", desc: "日を時間に変換します" },
    { cmd: "DAY>HOUR", desc: "日を時間に変換します" },
    { cmd: "DAY→MINUTE", desc: "日を分に変換します" },
    { cmd: "DAY>MINUTE", desc: "日を分に変換します" },
    { cmd: "DAY→SECOND", desc: "日を秒に変換します" },
    { cmd: "DAY>SECOND", desc: "日を秒に変換します" },
    { cmd: "HOUR→DAY", desc: "時間を日に変換します" },
    { cmd: "HOUR>DAY", desc: "時間を日に変換します" },
    { cmd: "HOUR→MINUTE", desc: "時間を分に変換します" },
    { cmd: "HOUR>MINUTE", desc: "時間を分に変換します" },
    { cmd: "HOUR→SECOND", desc: "時間を秒に変換します" },
    { cmd: "HOUR>SECOND", desc: "時間を秒に変換します" },
    { cmd: "MINUTE→DAY", desc: "分を日に変換します" },
    { cmd: "MINUTE>DAY", desc: "分を日に変換します" },
    { cmd: "MINUTE→HOUR", desc: "分を時間に変換します" },
    { cmd: "MINUTE>HOUR", desc: "分を時間に変換します" },
    { cmd: "MINUTE→SECOND", desc: "分を秒に変換します" },
    { cmd: "MINUTE>SECOND", desc: "分を秒に変換します" },
    { cmd: "SECOND→DAY", desc: "秒を日に変換します" },
    { cmd: "SECOND>DAY", desc: "秒を日に変換します" },
    { cmd: "SECOND→HOUR", desc: "秒を時間に変換します" },
    { cmd: "SECOND>HOUR", desc: "秒を時間に変換します" },
    { cmd: "SECOND→MINUTE", desc: "秒を分に変換します" },
    { cmd: "SECOND>MINUTE", desc: "秒を分に変換します" },
    { cmd: "BIT→BYTE", desc: "ビットをバイトに変換します" },
    { cmd: "BIT>BYTE", desc: "ビットをバイトに変換します" },
    { cmd: "BIT→KB", desc: "ビットをキロバイトに変換します" },
    { cmd: "BIT>KB", desc: "ビットをキロバイトに変換します" },
    { cmd: "BIT→MB", desc: "ビットをメガバイトに変換します" },
    { cmd: "BIT>MB", desc: "ビットをメガバイトに変換します" },
    { cmd: "BIT→GB", desc: "ビットをギガバイトに変換します" },
    { cmd: "BIT>GB", desc: "ビットをギガバイトに変換します" },
    { cmd: "BIT→TB", desc: "ビットをテラバイトに変換します" },
    { cmd: "BIT>TB", desc: "ビットをテラバイトに変換します" },
    { cmd: "BYTE→BIT", desc: "バイトをビットに変換します" },
    { cmd: "BYTE>BIT", desc: "バイトをビットに変換します" },
    { cmd: "BYTE→KB", desc: "バイトをキロバイトに変換します" },
    { cmd: "BYTE>KB", desc: "バイトをキロバイトに変換します" },
    { cmd: "BYTE→MB", desc: "バイトをメガバイトに変換します" },
    { cmd: "BYTE>MB", desc: "バイトをメガバイトに変換します" },
    { cmd: "BYTE→GB", desc: "バイトをギガバイトに変換します" },
    { cmd: "BYTE>GB", desc: "バイトをギガバイトに変換します" },
    { cmd: "BYTE→TB", desc: "バイトをテラバイトに変換します" },
    { cmd: "BYTE>TB", desc: "バイトをテラバイトに変換します" },
    { cmd: "KB→BIT", desc: "キロバイトをビットに変換します" },
    { cmd: "KB>BIT", desc: "キロバイトをビットに変換します" },
    { cmd: "KB→BYTE", desc: "キロバイトをバイトに変換します" },
    { cmd: "KB>BYTE", desc: "キロバイトをバイトに変換します" },
    { cmd: "KB→MB", desc: "キロバイトをメガバイトに変換します" },
    { cmd: "KB>MB", desc: "キロバイトをメガバイトに変換します" },
    { cmd: "KB→GB", desc: "キロバイトをギガバイトに変換します" },
    { cmd: "KB>GB", desc: "キロバイトをギガバイトに変換します" },
    { cmd: "KB→TB", desc: "キロバイトをテラバイトに変換します" },
    { cmd: "KB>TB", desc: "キロバイトをテラバイトに変換します" },
    { cmd: "MB→BIT", desc: "メガバイトをビットに変換します" },
    { cmd: "MB>BIT", desc: "メガバイトをビットに変換します" },
    { cmd: "MB→BYTE", desc: "メガバイトをバイトに変換します" },
    { cmd: "MB>BYTE", desc: "メガバイトをバイトに変換します" },
    { cmd: "MB→KB", desc: "メガバイトをキロバイトに変換します" },
    { cmd: "MB>KB", desc: "メガバイトをキロバイトに変換します" },
    { cmd: "MB→GB", desc: "メガバイトをギガバイトに変換します" },
    { cmd: "MB>GB", desc: "メガバイトをギガバイトに変換します" },
    { cmd: "MB→TB", desc: "メガバイトをテラバイトに変換します" },
    { cmd: "MB>TB", desc: "メガバイトをテラバイトに変換します" },
    { cmd: "GB→BIT", desc: "ギガバイトをビットに変換します" },
    { cmd: "GB>BIT", desc: "ギガバイトをビットに変換します" },
    { cmd: "GB→BYTE", desc: "ギガバイトをバイトに変換します" },
    { cmd: "GB>BYTE", desc: "ギガバイトをバイトに変換します" },
    { cmd: "GB→KB", desc: "ギガバイトをキロバイトに変換します" },
    { cmd: "GB>KB", desc: "ギガバイトをキロバイトに変換します" },
    { cmd: "GB→MB", desc: "ギガバイトをメガバイトに変換します" },
    { cmd: "GB>MB", desc: "ギガバイトをメガバイトに変換します" },
    { cmd: "GB→TB", desc: "ギガバイトをテラバイトに変換します" },
    { cmd: "GB>TB", desc: "ギガバイトをテラバイトに変換します" },
    { cmd: "TB→BIT", desc: "テラバイトをビットに変換します" },
    { cmd: "TB>BIT", desc: "テラバイトをビットに変換します" },
    { cmd: "TB→BYTE", desc: "テラバイトをバイトに変換します" },
    { cmd: "TB>BYTE", desc: "テラバイトをバイトに変換します" },
    { cmd: "TB→KB", desc: "テラバイトをキロバイトに変換します" },
    { cmd: "TB>KB", desc: "テラバイトをキロバイトに変換します" },
    { cmd: "TB→MB", desc: "テラバイトをメガバイトに変換します" },
    { cmd: "TB>MB", desc: "テラバイトをメガバイトに変換します" },
    { cmd: "TB→GB", desc: "テラバイトをギガバイトに変換します" },
    { cmd: "TB>GB", desc: "テラバイトをギガバイトに変換します" },
    { cmd: "C→F", desc: "摂氏を華氏に変換します" },
    { cmd: "C>F", desc: "摂氏を華氏に変換します" },
    { cmd: "C→K", desc: "摂氏をケルビンに変換します" },
    { cmd: "C>K", desc: "摂氏をケルビンに変換します" },
    { cmd: "F→C", desc: "華氏を摂氏に変換します" },
    { cmd: "F>C", desc: "華氏を摂氏に変換します" },
    { cmd: "F→K", desc: "華氏をケルビンに変換します" },
    { cmd: "F>K", desc: "華氏をケルビンに変換します" },
    { cmd: "K→C", desc: "ケルビンを摂氏に変換します" },
    { cmd: "K>C", desc: "ケルビンを摂氏に変換します" },
    { cmd: "K→F", desc: "ケルビンを華氏に変換します" },
    { cmd: "K>F", desc: "ケルビンを華氏に変換します" },
    { cmd: "DEG→RAD", desc: "度をラジアンに変換します"},
    { cmd: "DEG>RAD", desc: "度をラジアンに変換します"},
    { cmd: "RAD→DEG", desc: "ラジアンを度に変換します"},
    { cmd: "RAD>DEG", desc: "ラジアンを度に変換します"},
    { cmd: "RESET", desc: "隠しコマンドのアニメーションをリセットします"}
];

//タグ
const Calcurator_body = document.getElementById("Calcurator_body");

const add_number = document.getElementById("add_number");
const tr_clear = document.getElementById("tr_clear");
const tr_Allclear = document.getElementById("tr_Allclear");
const tr_dot = document.getElementById("tr_dot");
const tr_plus = document.getElementById("tr_plus");
const tr_minu = document.getElementById("tr_minu");
const tr_timm = document.getElementById("tr_timm");
const tr_divi = document.getElementById("tr_divi");
const tr_equa = document.getElementById("tr_equa");

const tr_Mplus = document.getElementById("tr_Mplus");
const tr_Mminu = document.getElementById("tr_Mminu");

const tr_MC = document.getElementById("tr_MC");
const tr_MR = document.getElementById("tr_MR");

const tr_PlusMinus = document.getElementById("tr_PlusMinus");

const  add_memory = document.getElementById("add_memory");

const tr_Squared = document.getElementById("tr_Squared");
const tr_Sqrt = document.getElementById("tr_Sqrt");
const tr_Factorial = document.getElementById("tr_Factorial");
const tr_Dice = document.getElementById("tr_Dice");

const tr_Floor = document.getElementById("tr_Floor");
const tr_Log = document.getElementById("tr_Log");
const tr_Ln = document.getElementById("tr_Ln");
const tr_Exp = document.getElementById("tr_Exp");

const tr_Inde = document.getElementById("tr_Inde");
const tr_Loga = document.getElementById("tr_Loga");
const tr_Modd = document.getElementById("tr_Modd");
const tr_pow10 = document.getElementById("tr_pow10");

const tr_BackSpace = document.getElementById("tr_BackSpace");

const chk_round = document.getElementById("chk_round");
const chk_DisplayMemory = document.getElementById("chk_DisplayMemory");
const Display_Memory = document.getElementById("Display_Memory");

const chk_DisplayFunction = document.getElementById("chk_DisplayFunction");
const chk_Error = document.getElementById("chk_Error");
const chk_Command = document.getElementById("chk_Command");
const chk_Button = document.getElementById("chk_Button");

const Button_function = document.querySelectorAll(".Button_function");

const Display_Exist_Memory = document.getElementById("Display_Exist_Memory");

const tr_Perm = document.getElementById("tr_Perm");
const tr_Comb = document.getElementById("tr_Comb");
const tr_Reciprocal = document.getElementById("tr_Reciprocal");
const tr_Pi = document.getElementById("tr_Pi");

const Display_Funciton_command = document.getElementById("Display_Funciton_command");
const add_function_command = document.getElementById("add_function_command");

const Calcurator_Button = document.getElementById("Calcurator_Button");

const add_calc = document.getElementById("add_calc");

const detail_setting = document.getElementById("detail_setting");

const suggestionBox = document.getElementById("command_suggestions");

const chk_Degree = document.getElementById("chk_Degree");

const chk_Infinity = document.getElementById("chk_Infinity");
const chk_Zero = document.getElementById("chk_Zero");

window.onload = () => {

    SetButton();
    LoadSetting();

    Memory_storage = LoadMemory();
    showMemory(Memory_storage);

    //初期化
    InitProc();

}

function SetButton(){
    //ボタンにクリックイベント追加
    for(let i = 0; i < BolPush.length; i++){
        document.getElementById("tr_"+zeroPadding(i, 2 ,"0")).onclick = addclick_num;
    }
    tr_clear.onclick = addclick_clear;
    tr_Allclear.onclick = addclick_Allclear;

    tr_dot.onclick = addclick_dot;

    tr_plus.onclick = addclick_calc;
    tr_minu.onclick = addclick_calc;
    tr_timm.onclick = addclick_calc;
    tr_divi.onclick = addclick_calc;

    tr_equa.onclick = addclick_equal;

    tr_Mplus.onclick = addclick_Memory_plus;
    tr_Mminu.onclick = addclick_Memory_minu;
    tr_MC.onclick    = addclick_Mamory_clear;
    tr_MR.onclick    = addclick_Mamory_recall;

    tr_PlusMinus.onclick = addclick_PlusMinus; 

    tr_Squared.onclick = addclick_Squared;
    tr_Sqrt.onclick = addclick_Sqrt;
    tr_Factorial.onclick = addclick_Factorial;
    tr_Dice.onclick = addclick_Dice;

    tr_Floor.onclick = addclick_Floor;
    tr_Log.onclick = addclick_Log;
    tr_Ln.onclick = addclick_Ln;
    tr_Exp.onclick = addclick_Exp;

    tr_Inde.onclick = addclick_calc;
    tr_Loga.onclick = addclick_calc;
    tr_Modd.onclick = addclick_calc;
    tr_pow10.onclick = addclick_Pow10;

    tr_BackSpace.onclick = addclick_BackSpace;

    chk_round.onclick = addclick_Round;
    chk_DisplayMemory.onclick = addclick_DisplayMemory;
    chk_DisplayFunction.onclick = addclick_DisplayFunction;
    chk_Error.onclick = addclick_Round;
    chk_Command.onclick = addclick_Command;
    chk_Button.onclick = addclick_Button;

    tr_Perm.onclick = addclick_calc;
    tr_Comb.onclick = addclick_calc;
    tr_Reciprocal.onclick  = addclick_Reciprocal;
    tr_Pi.onclick = addclick_Pi;

    detail_setting.ontoggle = addclick_Setting;
    chk_Degree.onclick = addclick_Setting;
    
    chk_Infinity.onclick = addclick_Round;
    chk_Zero.onclick = addclick_Round;

    Calcurator_body.onkeydown = KeyboradPush;
    Calcurator_body.onkeyup = KeyboradUp;
}

//初期化
function InitProc(){
    add_number.value = "0";
    add_number.dataset.exact = "0";
    Num_answer = 0;
    Memory_NUM = 0;
    Calc_mode = 0;
    Memory_Ans_num = 0;
    Calc_count = 0;

    flg_change = false;
    flg_equal = false;

    add_calc.value = "";
}

//数字追加
const addclick_num =(event) =>{
    let PushNum = parseInt(event.target.id.substr(3,2));
    numberPush(PushNum);
};

function numberPush(num){
    if(add_number.value == "0" || flg_change){
        add_number.value = num;
        flg_change = false;
    } else {
        add_number.value = add_number.value + num;
    }
    // 内部値も同期
    add_number.dataset.exact = String(Number(add_number.value));
    flg_equal = false;
}

//キーボードイベント
const KeyboradUp =(event) =>{
    //CASIOコマンドチェック
    CASIOCmmandChk(event.key ,false)
};

//キーボードイベント
const KeyboradPush =(event) =>{
    console.log(event.key);
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight' ,'Enter'];

    if (arrowKeys.includes(event.key)) {
        event.preventDefault(); // 矢印キーによるスクロールやフォーカス移動を阻止
    }


    if (/^[0-9]$/.test(event.key)) {
        numberPush(Number(event.key));
    }
    else if(event.key == "+"){
        if(chk_Command.checked && add_function_command.value == "M"){
            MemoryPlus();   
        }
        else{
            CalcModeSet(Modeplus);
        }
        
    }
    else if(event.key == "-"){
        if(chk_Command.checked && add_function_command.value == "M"){
            MemoryMinus();   
        }
        else{
            CalcModeSet(Modeminu);
        }
    }
    else if(event.key == "*"){
        CalcModeSet(Modetimm);
    }
    else if(event.key == "/"){
        CalcModeSet(Modedivi);
    }
    else if(event.key == "."){
        addDot();
    }
    else if(event.key == "Enter"){
        if(add_function_command.value == "" || !chk_Command.checked){
            Calculate_Equal();
        }
        else{
            if(Command_Function(add_function_command.value)){
                Command_Recall = add_function_command.value;
            }
            add_function_command.value = "";
            SuggestCommand();
        }
    }
    else if(event.key == "="){
        MathPlusMinus();
    }
    else if(event.key == "Backspace"){
        Backspace();
    }
    else if(event.key == "Delete"){
        InitProc();
    }
    else if(event.key == "Home"){
        if(Command_Recall != ""){
            add_function_command.value = Command_Recall;
        }
    }
    else{
        if(chk_Command.checked){
            if(event.key.length == 1){
                add_function_command.value = add_function_command.value + event.key.toUpperCase();
            }
            else if(event.key == "Control"){
                add_function_command.value = add_function_command.value.slice(0, add_function_command.value.length - 1);
            }
            else if(event.key == "ArrowUp"){
                add_function_command.value = add_function_command.value + "↑";
            }
            else if(event.key == "ArrowDown"){
                add_function_command.value = add_function_command.value + "↓";
            }
            else if(event.key == "ArrowRight"){
                add_function_command.value = add_function_command.value + "→";
            }
            else if(event.key == "ArrowLeft"){
                add_function_command.value = add_function_command.value + "←";
            }
            SuggestCommand();
        }
        else{
            if(event.key == "ArrowDown"){
                chk_Command.checked = true;
                DisplayCommand_hidden();
                SaveSetting();
            }
        }
    }

    //CASIOコマンドチェック
    CASIOCmmandChk(event.key ,true);
};

function Command_Function(comand){
    switch(comand){
        case "I":
            numberPush(1);
            break;
        case  "II":
            numberPush(2);
            break;
        case  "III":
            numberPush(3);
            break;
        case  "IV":
        case  "IIII":
            numberPush(4);
            break;
        case  "V":
            numberPush(5);
            break;
        case  "VI":
            numberPush(6);
            break;
        case  "VII":
            numberPush(7);
            break;
        case  "VIII":
            numberPush(8);
            break;
        case  "IX":
        case  "VIIII":
            numberPush(9);
            break;
        case  "X":
            numberPush(10);
            break;
        case  " ":
        case  "_":
        case "ZERO":
            numberPush(0);
            break;
        case "SQUARED":
        case "^II":
            MathSquared();    
            break;
        case "SQRT":
        case "ROOT":
            MathSqrt();
            break;
        case "FACTORIAL":
        case "!":
            MathFactorial();
            break;
        case "DICE":
        case "SAIKORO":
            MathDice();
            break;
        case "[]":
        case "[X]":
        case "FLOOR":
            MathFloor();
            break;
        case "LOG":
        case "LOGX":
            MathLog();
            break;
        case "LN":
        case "LOGE":
            MathLn();
            break;
        case "EXP":
        case "EXPONENTIAL":
            MathExp();
            break;
        case "^":
        case "POW":
        case "POWER":
            CalcModeSet(ModeInde);
            break;
        case "LOGYX":
            CalcModeSet(ModeLoga);
            break;
        case "MOD":
            CalcModeSet(ModeModd);
            break;
        case "POWX":
        case "POWERX":
        case "X^":
        case "^X":
            MathPow10();
            break;
        case "P":
        case "NPR":
        case "PERMUTATION":
            CalcModeSet(ModePerm);
            break;
        case "C":
        case "NCR":
        case "COMBINATION":
            CalcModeSet(ModeComb);
            break;        
        case "[I":
        case "]I":
        case "[I]":
        case "|I":
        case "I|":
        case "RECIPROCAL":
            MathReciprocal();
            break;
        case "PI":
            MathPi();
            break;
        case "↑↑↓↓←→←→BA":
            if(add_number.value == "CASI○"){
                alert(`よく見つけたね\nコードを見たのかな？`);
                CASIO_COMAND.NUM_1 = false;  
                CASIO_COMAND.NUM_3 = false;  
                CASIO_COMAND.NUM_7 = false; 
                CASIO_COMAND.NUM_9 = false;
                CASIO_COMAND.KEY_DELETE = false; 
                showResult(getExact());
            }
            else{
                alert(`隠しコマンド発見！！\n、、、特に何も無いです(\´・ω・\`)`);
            }
            break;
        case "M":
            break;
        case "MEMORYPLUS":
        case "MPLUS":
            MemoryPlus();
            break;
        case "MEMORYMINUS":
        case "MMINUS":
            MemoryMinus();
            break;
        case "MC":
        case "MEMORYCLEAR":
            MemoryClear_com();
            break;
        case "MR":
        case "MEMORYRECALL":
            MemoryRecall();
            break;
        case "MEMORYSTORE":
        case "MS":
            MemoryStore();
            break;
        case "THOUSAND":
            numberPush(1000);
            break;
        case "MILLION":
            numberPush(1000000);
            break;
        case "PLUSMINUS":
            MathPlusMinus();
            break;
        case "CLEAR":
            CalculateClear();
            break;
        case "ALLCLEAR":
            InitProc();
            break;
        case "SIN":
            trigonometric(tri_sin);
            break;
        case "COS":
            trigonometric(tri_cos);
            break;
        case "TAN":
            trigonometric(tri_tan);
            break;
        case "ARCSIN":
        case "ASIN":
            trigonometric(tri_arcsin);
            break;
        case "ARCCOS":
        case "ACOS":
            trigonometric(tri_arccos);
            break;
        case "ARCTAN":
        case "ATAN":
            trigonometric(tri_arctan);
            break;
        case "SEC":
            trigonometric(tri_sec);
            break;
        case "CSC":
            trigonometric(tri_csc);
            break;
        case "COT":
            trigonometric(tri_cot);
            break;
        case "SINH":
            trigonometric(tri_sinh);
            break;
        case "COSH":
            trigonometric(tri_cosh);
            break;
        case "TANH":
            trigonometric(tri_tanh);
            break;
        case "ARCSINH":
        case "ASINH":
            trigonometric(tri_arcsinh);
            break;
        case "ARCCOSH":
        case "ACOSH":
            trigonometric(tri_arccosh);
            break;
        case "ARCTANH":
        case "ATANH":
            trigonometric(tri_arctanh);
            break;
        case "COMMANDCLOSE":
        case "CLOSE":
        case "SETTINGCOMMAND":
            chk_Command.checked = false;
            DisplayCommand_hidden();
            SaveSetting();
            break;
        case "MEMORYDISPLAY":
        case "SETTINGMEMORY":
            chk_DisplayMemory.checked = !chk_DisplayMemory.checked;
            DisplayMemory_hidden();
            Display_Exist_Memory.innerText = Memory_Exsist_check(parseFloat(add_memory.value));
            SaveSetting();
            break;
        case "SETTINGROUND":
            chk_round.checked = !chk_round.checked;
            showResult(getExact());
            showMemory(Memory_storage);
            SaveSetting();
            break;
        case "SETTINGINFINITY":
            chk_Infinity.checked = !chk_Infinity.checked;
            showResult(getExact());
            showMemory(Memory_storage);
            SaveSetting();
            break;
        case "SETTINGZERO":
            chk_Zero.checked = !chk_Zero.checked;
            showResult(getExact());
            showMemory(Memory_storage);
            SaveSetting();
            break;
        case "FUNCTIONDISPLAY":
        case "SETTINGFUNCTION":
            chk_DisplayFunction.checked = !chk_DisplayFunction.checked;
            DisplayFunction_hidden();
            SaveSetting();
            break;
        case "SETTINGNAN":
        case "INFINITYNAN":
        case "NANINFINITY":
        case "SETTINGERROR":
            chk_Error.checked = !chk_Error.checked;
            showResult(getExact());
            SaveSetting();
            break;
        case "SETTINGBUTTON":
        case "BUTTONDISPLAY":
            chk_Button.checked = !chk_Button.checked;
            DisplayButton_hidden();
            SaveSetting();
            break;
        case "SETTINGDEG":
        case "SETTINGRAD":
            chk_Degree.checked = !chk_Degree.checked;
            showResult(getExact());
            SaveSetting();
            break;
        case "SETTINGOPEN":
        case "SETTINGCLOSE":
            detail_setting.open = !detail_setting.open;
            SaveSetting();
            break;
        //単位換算
        // 長さ：km, m, cm, mm, inch, feet, yard, mile
        case "KM→M":
        case "KM>M":
            UnitConvertion(unit_km, unit_m);
            break;
        case "KM→CM":
        case "KM>CM":
            UnitConvertion(unit_km, unit_Cm);
            break;
        case "KM→MM":
        case "KM>MM":
            UnitConvertion(unit_km, unit_mm);
            break;
        case "KM→INCH":
        case "KM>INCH":
            UnitConvertion(unit_km, unit_inch);
            break;
        case "KM→FEET":
        case "KM>FEET":
            UnitConvertion(unit_km, unit_Feet);
            break;
        case "KM→YARD":
        case "KM>YARD":
            UnitConvertion(unit_km, unit_yard);
            break;
        case "KM→MILE":
        case "KM>MILE":
            UnitConvertion(unit_km, unit_mile);
            break;
        case "M→KM":
        case "M>KM":
            UnitConvertion(unit_m, unit_km);
            break;
        case "M→CM":
        case "M>CM":
            UnitConvertion(unit_m, unit_Cm);
            break;
        case "M→MM":
        case "M>MM":
            UnitConvertion(unit_m, unit_mm);
            break;
        case "M→INCH":
        case "M>INCH":
            UnitConvertion(unit_m, unit_inch);
            break;
        case "M→FEET":
        case "M>FEET":
            UnitConvertion(unit_m, unit_Feet);
            break;
        case "M→YARD":
        case "M>YARD":
            UnitConvertion(unit_m, unit_yard);
            break;
        case "M→MILE":
        case "M>MILE":
            UnitConvertion(unit_m, unit_mile);
            break;
        case "CM→KM":
        case "CM>KM":
            UnitConvertion(unit_Cm, unit_km);
            break;
        case "CM→M":
        case "CM>M":
            UnitConvertion(unit_Cm, unit_m);
            break;
        case "CM→MM":
        case "CM>MM":
            UnitConvertion(unit_Cm, unit_mm);
            break;
        case "CM→INCH":
        case "CM>INCH":
            UnitConvertion(unit_Cm, unit_inch);
            break;
        case "CM→FEET":
        case "CM>FEET":
            UnitConvertion(unit_Cm, unit_Feet);
            break;
        case "CM→YARD":
        case "CM>YARD":
            UnitConvertion(unit_Cm, unit_yard);
            break;
        case "CM→MILE":
        case "CM>MILE":
            UnitConvertion(unit_Cm, unit_mile);
            break;
        case "MM→KM":
        case "MM>KM":
            UnitConvertion(unit_mm, unit_km);
            break;
        case "MM→M":
        case "MM>M":
            UnitConvertion(unit_mm, unit_m);
            break;
        case "MM→CM":
        case "MM>CM":
            UnitConvertion(unit_mm, unit_Cm);
            break;
        case "MM→INCH":
        case "MM>INCH":
            UnitConvertion(unit_mm, unit_inch);
            break;
        case "MM→FEET":
        case "MM>FEET":
            UnitConvertion(unit_mm, unit_Feet);
            break;
        case "MM→YARD":
        case "MM>YARD":
            UnitConvertion(unit_mm, unit_yard);
            break;
        case "MM→MILE":
        case "MM>MILE":
            UnitConvertion(unit_mm, unit_mile);
            break;
        case "INCH→KM":
        case "INCH>KM":
            UnitConvertion(unit_inch, unit_km);
            break;
        case "INCH→M":
        case "INCH>M":
            UnitConvertion(unit_inch, unit_m);
            break;
        case "INCH→CM":
        case "INCH>CM":
            UnitConvertion(unit_inch, unit_Cm);
            break;
        case "INCH→MM":
        case "INCH>MM":
            UnitConvertion(unit_inch, unit_mm);
            break;
        case "INCH→FEET":
        case "INCH>FEET":
            UnitConvertion(unit_inch, unit_Feet);
            break;
        case "INCH→YARD":
        case "INCH>YARD":
            UnitConvertion(unit_inch, unit_yard);
            break;
        case "INCH→MILE":
        case "INCH>MILE":
            UnitConvertion(unit_inch, unit_mile);
            break;
        case "FEET→KM":
        case "FEET>KM":
            UnitConvertion(unit_Feet, unit_km);
            break;
        case "FEET→M":
        case "FEET>M":
            UnitConvertion(unit_Feet, unit_m);
            break;
        case "FEET→CM":
        case "FEET>CM":
            UnitConvertion(unit_Feet, unit_Cm);
            break;
        case "FEET→MM":
        case "FEET>MM":
            UnitConvertion(unit_Feet, unit_mm);
            break;
        case "FEET→INCH":
        case "FEET>INCH":
            UnitConvertion(unit_Feet, unit_inch);
            break;
        case "FEET→YARD":
        case "FEET>YARD":
            UnitConvertion(unit_Feet, unit_yard);
            break;
        case "FEET→MILE":
        case "FEET>MILE":
            UnitConvertion(unit_Feet, unit_mile);
            break;
        case "YARD→KM":
        case "YARD>KM":
            UnitConvertion(unit_yard, unit_km);
            break;
        case "YARD→M":
        case "YARD>M":
            UnitConvertion(unit_yard, unit_m);
            break;
        case "YARD→CM":
        case "YARD>CM":
            UnitConvertion(unit_yard, unit_Cm);
            break;
        case "YARD→MM":
        case "YARD>MM":
            UnitConvertion(unit_yard, unit_mm);
            break;
        case "YARD→INCH":
        case "YARD>INCH":
            UnitConvertion(unit_yard, unit_inch);
            break;
        case "YARD→FEET":
        case "YARD>FEET":
            UnitConvertion(unit_yard, unit_Feet);
            break;
        case "YARD→MILE":
        case "YARD>MILE":
            UnitConvertion(unit_yard, unit_mile);
            break;
        case "MILE→KM":
        case "MILE>KM":
            UnitConvertion(unit_mile, unit_km);
            break;
        case "MILE→M":
        case "MILE>M":
            UnitConvertion(unit_mile, unit_m);
            break;
        case "MILE→CM":
        case "MILE>CM":
            UnitConvertion(unit_mile, unit_Cm);
            break;
        case "MILE→MM":
        case "MILE>MM":
            UnitConvertion(unit_mile, unit_mm);
            break;
        case "MILE→INCH":
        case "MILE>INCH":
            UnitConvertion(unit_mile, unit_inch);
            break;
        case "MILE→FEET":
        case "MILE>FEET":
            UnitConvertion(unit_mile, unit_Feet);
            break;
        case "MILE→YARD":
        case "MILE>YARD":
            UnitConvertion(unit_mile, unit_yard);
            break;
        case "MMM→CMMM":
        case "MMM>CMMM":
            UnitConvertion(unit_mmm, unit_Cmmm);
            break;
        case "MMM→L":
        case "MMM>L":
            UnitConvertion(unit_mmm, unit_L);
            break;
        case "MMM→ML":
        case "MMM>ML":
            UnitConvertion(unit_mmm, unit_mL);
            break;
        case "MMM→GAL":
        case "MMM>GAL":
            UnitConvertion(unit_mmm, unit_gal);
            break;
        case "CMMM→MMM":
        case "CMMM>MMM":
            UnitConvertion(unit_Cmmm, unit_mmm);
            break;
        case "CMMM→L":
        case "CMMM>L":
            UnitConvertion(unit_Cmmm, unit_L);
            break;
        case "CMMM→ML":
        case "CMMM>ML":
            UnitConvertion(unit_Cmmm, unit_mL);
            break;
        case "CMMM→GAL":
        case "CMMM>GAL":
            UnitConvertion(unit_Cmmm, unit_gal);
            break;
        case "L→MMM":
        case "L>MMM":
            UnitConvertion(unit_L, unit_mmm);
            break;
        case "L→CMMM":
        case "L>CMMM":
            UnitConvertion(unit_L, unit_Cmmm);
            break;
        case "L→ML":
        case "L>ML":
            UnitConvertion(unit_L, unit_mL);
            break;
        case "L→GAL":
        case "L>GAL":
            UnitConvertion(unit_L, unit_gal);
            break;
        case "ML→MMM":
        case "ML>MMM":
            UnitConvertion(unit_mL, unit_mmm);
            break;
        case "ML→CMMM":
        case "ML>CMMM":
            UnitConvertion(unit_mL, unit_Cmmm);
            break;
        case "ML→L":
        case "ML>L":
            UnitConvertion(unit_mL, unit_L);
            break;
        case "ML→GAL":
        case "ML>GAL":
            UnitConvertion(unit_mL, unit_gal);
            break;
        case "GAL→MMM":
        case "GAL>MMM":
            UnitConvertion(unit_gal, unit_mmm);
            break;
        case "GAL→CMMM":
        case "GAL>CMMM":
            UnitConvertion(unit_gal, unit_Cmmm);
            break;
        case "GAL→L":
        case "GAL>L":
            UnitConvertion(unit_gal, unit_L);
            break;
        case "GAL→ML":
        case "GAL>ML":
            UnitConvertion(unit_gal, unit_mL);
            break;
        case "DAY→HOUR":
        case "DAY>HOUR":
            UnitConvertion(unit_day, unit_hour);
            break;
        case "DAY→MINUTE":
        case "DAY>MINUTE":
            UnitConvertion(unit_day, unit_minute);
            break;
        case "DAY→SECOND":
        case "DAY>SECOND":
            UnitConvertion(unit_day, unit_second);
            break;
        case "HOUR→DAY":
        case "HOUR>DAY":
            UnitConvertion(unit_hour, unit_day);
            break;
        case "HOUR→MINUTE":
        case "HOUR>MINUTE":
            UnitConvertion(unit_hour, unit_minute);
            break;
        case "HOUR→SECOND":
        case "HOUR>SECOND":
            UnitConvertion(unit_hour, unit_second);
            break;
        case "MINUTE→DAY":
        case "MINUTE>DAY":
            UnitConvertion(unit_minute, unit_day);
            break;
        case "MINUTE→HOUR":
        case "MINUTE>HOUR":
            UnitConvertion(unit_minute, unit_hour);
            break;
        case "MINUTE→SECOND":
        case "MINUTE>SECOND":
            UnitConvertion(unit_minute, unit_second);
            break;
        case "SECOND→DAY":
        case "SECOND>DAY":
            UnitConvertion(unit_second, unit_day);
            break;
        case "SECOND→HOUR":
        case "SECOND>HOUR":
            UnitConvertion(unit_second, unit_hour);
            break;
        case "SECOND→MINUTE":
        case "SECOND>MINUTE":
            UnitConvertion(unit_second, unit_minute);
            break;
        case "BIT→BYTE":
        case "BIT>BYTE":
            UnitConvertion(unit_bit, unit_byte);
            break;
        case "BIT→KB":
        case "BIT>KB":
            UnitConvertion(unit_bit, unit_KB);
            break;
        case "BIT→MB":
        case "BIT>MB":
            UnitConvertion(unit_bit, unit_MB);
            break;
        case "BIT→GB":
        case "BIT>GB":
            UnitConvertion(unit_bit, unit_GB);
            break;
        case "BIT→TB":
        case "BIT>TB":
            UnitConvertion(unit_bit, unit_TB);
            break;
        case "BYTE→BIT":
        case "BYTE>BIT":
            UnitConvertion(unit_byte, unit_bit);
            break;
        case "BYTE→KB":
        case "BYTE>KB":
            UnitConvertion(unit_byte, unit_KB);
            break;
        case "BYTE→MB":
        case "BYTE>MB":
            UnitConvertion(unit_byte, unit_MB);
            break;
        case "BYTE→GB":
        case "BYTE>GB":
            UnitConvertion(unit_byte, unit_GB);
            break;
        case "BYTE→TB":
        case "BYTE>TB":
            UnitConvertion(unit_byte, unit_TB);
            break;
        case "KB→BIT":
        case "KB>BIT":
            UnitConvertion(unit_KB, unit_bit);
            break;
        case "KB→BYTE":
        case "KB>BYTE":
            UnitConvertion(unit_KB, unit_byte);
            break;
        case "KB→MB":
        case "KB>MB":
            UnitConvertion(unit_KB, unit_MB);
            break;
        case "KB→GB":
        case "KB>GB":
            UnitConvertion(unit_KB, unit_GB);
            break;
        case "KB→TB":
        case "KB>TB":
            UnitConvertion(unit_KB, unit_TB);
            break;
        case "MB→BIT":
        case "MB>BIT":
            UnitConvertion(unit_MB, unit_bit);
            break;
        case "MB→BYTE":
        case "MB>BYTE":
            UnitConvertion(unit_MB, unit_byte);
            break;
        case "MB→KB":
        case "MB>KB":
            UnitConvertion(unit_MB, unit_KB);
            break;
        case "MB→GB":
        case "MB>GB":
            UnitConvertion(unit_MB, unit_GB);
            break;
        case "MB→TB":
        case "MB>TB":
            UnitConvertion(unit_MB, unit_TB);
            break;
        case "GB→BIT":
        case "GB>BIT":
            UnitConvertion(unit_GB, unit_bit);
            break;
        case "GB→BYTE":
        case "GB>BYTE":
            UnitConvertion(unit_GB, unit_byte);
            break;
        case "GB→KB":
        case "GB>KB":
            UnitConvertion(unit_GB, unit_KB);
            break;
        case "GB→MB":
        case "GB>MB":
            UnitConvertion(unit_GB, unit_MB);
            break;
        case "GB→TB":
        case "GB>TB":
            UnitConvertion(unit_GB, unit_TB);
            break;
        case "TB→BIT":
        case "TB>BIT":
            UnitConvertion(unit_TB, unit_bit);
            break;
        case "TB→BYTE":
        case "TB>BYTE":
            UnitConvertion(unit_TB, unit_byte);
            break;
        case "TB→KB":
        case "TB>KB":
            UnitConvertion(unit_TB, unit_KB);
            break;
        case "TB→MB":
        case "TB>MB":
            UnitConvertion(unit_TB, unit_MB);
            break;
        case "TB→GB":
        case "TB>GB":
            UnitConvertion(unit_TB, unit_GB);
            break;
        case "C→F":
        case "C>F":
            UnitConvertion(unit_C, unit_F);
            break;
        case "C→K":
        case "C>K":
            UnitConvertion(unit_C, unit_K);
            break;
        case "F→C":
        case "F>C":
            UnitConvertion(unit_F, unit_C);
            break;
        case "F→K":
        case "F>K":
            UnitConvertion(unit_F, unit_K);
            break;
        case "K→C":
        case "K>C":
            UnitConvertion(unit_K, unit_C);
            break;
        case "K→F":
        case "K>F":
            UnitConvertion(unit_K, unit_F);
            break;
        case "DEG→RAD":
        case "DEG>RAD":
            UnitConvertion(unit_deg, unit_rad);
            break;
        case "RAD→DEG":
        case "RAD>DEG":
            UnitConvertion(unit_rad, unit_deg);
            break;
        //隠しコマンド
        case "ROTATION":
        case "ROTATE":
        case "BARREL":
            playOnce("effect-spin-once");
            break;

        case "ROTATIONHALF":
        case "ROTATEHALF":
            playHalfRotation();
            break;

        case "ROTATIONINFINITY":
        case "ROTATEINFINITY":
        case "SPIN":
            toggleInfiniteSpin();
            break;

        case "ASKEW":
        case "TILT":
            applyAskew();
            break;

        case "RESET":
        case "STABLE":
        case "CLEARFX":
            resetEffects();
            break;
        default:
            // alert("無効なコマンドです: " + comand);
            return false;
    }
    return true;
}

function CASIOCmmandChk(key ,boolkey){
    if(key === "1"){
        CASIO_COMAND.NUM_1 = boolkey;  
    }
    else if(key === "3"){
        CASIO_COMAND.NUM_3 = boolkey;  
    }
    else if(key === "7"){
        CASIO_COMAND.NUM_7 = boolkey;  
    }
    else if(key === "9"){
        CASIO_COMAND.NUM_9 = boolkey;  
    }
    else if(key === "Delete"){
        CASIO_COMAND.KEY_DELETE = boolkey;  
    }

    if(
       CASIO_COMAND.NUM_1
       && CASIO_COMAND.NUM_3 
       && CASIO_COMAND.NUM_7
       && CASIO_COMAND.NUM_9
       && CASIO_COMAND.KEY_DELETE
    ){
        add_number.value = "CASI○";
    }
    else{
        if(add_number.value == "CASI○"){
            showResult(getExact());
        }
    }
}

//小数点追加
const addclick_dot =() =>{
    addDot();
};

function addDot(){
    if(add_number.value == "0" || flg_change){
        add_number.value = "0.";
        flg_change = false;
    } else {
        if(dot_check()){
            add_number.value = add_number.value + ".";
        }
    }
    // 内部値も同期（末尾が '.' の場合は維持）
    if (!add_number.value.endsWith(".")) {
        add_number.dataset.exact = String(Number(add_number.value));
    }
    flg_equal = false;
}

//少数点がすでについていないかを確認。
function dot_check(){
    let Num_Data = add_number.value;

    for(let i=0; i<Num_Data.length; i++){
        if(Num_Data[i] == "."){
            return false;
        }
    }
    return true;
}

//演算処理
const addclick_calc =(event) =>{
    const PushModeStr = event.target.id.substr(3,4);
    
    CalcModeSet(PushModeStr)
};

function CalcModeSet(ModeStr){
    const modeMap = { plus :plus, minu :minu, timm: timm, divi: divi ,Inde: Inde ,Loga:Loga ,Modd: Modd ,Perm: Perm ,Comb:Comb};
    const nextMode = modeMap[ModeStr];

    // 直前が＝直後でない演算子押下なら確定、直前も演算子ならモードだけ更新
    if (!flg_equal) {
        if (Calc_count === 0) {
            Memory_NUM = getExact();
        }
        else if (!flg_change) {
            Memory_NUM = CalculateBinary(Calc_mode, Memory_NUM, getExact());
            showResult(Memory_NUM);
        }
    }
    Calc_mode = nextMode;
    Calc_count++;
    flg_change = true;     // 次の数値入力で上書き
    flg_equal = false;
    add_calc.value = CalcMode_text(modeMap[ModeStr]);
}

function CalcMode_text(mode){
    switch(mode){
        case plus:
            return "＋";
        case minu:
            return "ー";
        case timm:
            return "✕";
        case divi:
            return "÷";
        case Inde:
            return "^";
        case Loga:
            return "log";
        case Modd:
            return "Mod";
        case Perm:
            return "P";
        case Comb:
            return "C";
        default:
            return "";
    }
}

//「=」押下
const addclick_equal =() =>{
    Calculate_Equal();
};

//計算処理
function Calculate_Equal(){
    let Anan = 0;

    if(!flg_equal){
        Memory_Ans_num = getExact(); 
    }

    Anan = CalculateBinary(Calc_mode, Memory_NUM ,Memory_Ans_num)

    console.log(Calc_mode+":"+Memory_NUM + "," + add_number.value + "," + Anan);

    showResult(Anan);

    Memory_NUM = Anan;

    flg_change = true;
    flg_equal = true; 
}

//演算処理
function CalculateBinary(AIntCaluMode, AIntNum ,AIntNum_Ans){
    //足し算
    if(AIntCaluMode == plus){
        return AIntNum + AIntNum_Ans;   
    }
    //引き算
    else if(AIntCaluMode == minu){
        return AIntNum - AIntNum_Ans;   
    }
    //掛け算
    else if(AIntCaluMode == timm){
        return AIntNum * AIntNum_Ans;   
    }
    //割り算
    else if(AIntCaluMode == divi){
        return AIntNum / AIntNum_Ans;   
    }
    //累乗
    else if(AIntCaluMode == Inde){
        return AIntNum ** AIntNum_Ans;   
    }
    //対数(底を任意で設定)
    else if(AIntCaluMode == Loga){
        return Math.log(AIntNum) / Math.log(AIntNum_Ans);   
    }
    //あまり
    else if(AIntCaluMode == Modd){
        return AIntNum % AIntNum_Ans;   
    }
    //順列(nPr)
    else if(AIntCaluMode == Perm){
        return Permutation(AIntNum,AIntNum_Ans);
    }
    //組み合わせ(nCr)
    else if(AIntCaluMode == Comb){
        return Combination(AIntNum,AIntNum_Ans);
    }
    else{
        return AIntNum_Ans;    
    }
}

//順列の計算(nPr)
function Permutation(n,r){
    if(n < r){
        return NaN;
    }
    return Factorial(n) / Factorial(n - r);
}

//組み合わせの計算(nCr)
function Combination(n,r){
    if(n < r){
        return NaN;
    }
    return Permutation(n,r) / Factorial(r);
}

//+/-変換
const addclick_PlusMinus =() =>{
    MathPlusMinus();
};

function MathPlusMinus(){
    showResult(-1 * getExact());
}

//クリア
const addclick_clear =() =>{
    CalculateClear();
};

function CalculateClear(){
    showResult(0);
}

//オールクリア
const addclick_Allclear =() =>{
    InitProc();
};

//メモリー加算(M+)
const addclick_Memory_plus =() =>{
    MemoryPlus();
};

function MemoryPlus(){
    Memory_storage = SaveMemory(getExact(), plus);
    showMemory(Memory_storage);  
}

//メモリー減算(M+)
const addclick_Memory_minu =() =>{
    MemoryMinus();
};

function MemoryMinus(){
    Memory_storage = SaveMemory(getExact() ,minu);
    showMemory(Memory_storage);
}

//メモリー削除(MC)
const addclick_Mamory_clear = () =>{
    MemoryClear_com();
}

function MemoryClear_com(){
    MemoryClear();
    showMemory(Memory_storage); // 0 を表示
}

//メモリーリコール(MR)
const addclick_Mamory_recall = () =>{
    MemoryRecall();
};

function MemoryRecall(){
    if(Memory_storage != 0){
        showResult(Memory_storage);
        console.log("メモリーをリコールしました");
    }
    else if(Memory_storage === 0){
        console.log("メモリーの値がありませんでした。");
    }
}

//メモリーストア
function MemoryStore(){
    Memory_storage = SaveMemory(getExact() ,modeMemoryStore);
    showMemory(Memory_storage);
}

//2乗
const addclick_Squared = () =>{
    MathSquared();    
};

function MathSquared(){
    showResult(getExact() ** 2);
    flg_change = true;
}

//√2
const addclick_Sqrt = () =>{
    MathSqrt();
};

function MathSqrt(){
    showResult(Math.sqrt(getExact()));
    flg_change = true;
}

//階乗(範囲を実数に拡大)
const addclick_Factorial = () =>{
    MathFactorial()
};

function MathFactorial(){
    showResult(Factorial(getExact()));
    flg_change = true; 
}

//乱数：(サイコロ)1️～6までの範囲で乱数を表示します。
const addclick_Dice = () =>{
    MathDice();
};

function MathDice(){
    showResult(getRandomInt(6) + 1);
    flg_change = true;
}

//ガウス記号
const addclick_Floor = () =>{
    MathFloor();
};

function MathFloor(){
    showResult(Floor(getExact()));
    flg_change = true;
}

//常用対数とは、底が10の対数
const addclick_Log = () =>{
    MathLog();
};

function MathLog(){
    showResult(Math.log10(getExact()));
    flg_change = true;
}

//自然対数
const addclick_Ln = () =>{
    showResult(Math.log(getExact()));
    flg_change = true;
};

function MathLn(){
    showResult(Math.log(getExact()));
    flg_change = true;
}

//ネイピア数(e^x)
const addclick_Exp = () =>{
    showResult(Math.exp(getExact()));
    flg_change = true;
};

function MathExp(){
    showResult(Math.exp(getExact()));
    flg_change = true;
}

//10^x
const addclick_Pow10 = () =>{
    MathPow10();
};
function MathPow10(){
    showResult(10 ** getExact());
    flg_change = true;
}

//逆数
const addclick_Reciprocal = () =>{
    MathReciprocal()
}

function MathReciprocal(){
    showResult(1 / getExact());
    flg_change = true; 
}

//円周率(Pi)表示
const addclick_Pi = () =>{
    MathPi();
}

function MathPi(){
    showResult(Math.PI);
    flg_change = true; 
}

//単位換算
function UnitConvertion(codeA ,codeB){
    showResult(UnitConvertion_function(getExact() ,codeA, codeB));
    flg_change = true;    
}

function trigonometric(mode){
    showResult(MathTrigonometric(getExact() ,mode));
    flg_change = true; 
}

//一桁削除
const addclick_BackSpace = () =>{
    Backspace();
};

function Backspace(){
    // 「直前が計算確定」または「関数ボタン直後」であれば処理しない
    if (flg_change || flg_equal) {
        return; // 無効化
    }

    let s = add_number.value.slice(0, add_number.value.length - 1);
    if (s === "" || s === "-") s = "0";
    showResult(Number(s));
}

//設定(小数点10桁以下で桁まとめ)
const addclick_Round = () =>{
    showResult(getExact());
    showMemory(Memory_storage);
    SaveSetting();
};

//設定(ローカルストレージに保存のみ行う)
const addclick_Setting = () =>{
    SaveSetting();
};


//設定(メモリの値を表示)
const addclick_DisplayMemory = () =>{
    DisplayMemory_hidden();
    Display_Exist_Memory.innerText = Memory_Exsist_check(parseFloat(add_memory.value));
    SaveSetting();
};
function DisplayMemory_hidden(){
    if(chk_DisplayMemory.checked){
        Display_Memory.hidden = false;
    }
    else{
        Display_Memory.hidden = true;
    }
}

//設定(関数機能のボタンを表示)
const addclick_DisplayFunction = () =>{
    DisplayFunction_hidden();
    SaveSetting();
};
function DisplayFunction_hidden(){
    Button_function.forEach(tr => tr.hidden = !chk_DisplayFunction.checked);
}

//設定(コマンドバーを表示)
const addclick_Command = () =>{
    DisplayCommand_hidden();
    SaveSetting();
};
function DisplayCommand_hidden(){
    if(chk_Command.checked){
        Display_Funciton_command.hidden = false;
    }
    else{
        Display_Funciton_command.hidden = true;
    }
}

//設定(ボタンを表示)
const addclick_Button = () =>{
    DisplayButton_hidden();
    SaveSetting();
};
function DisplayButton_hidden(){
    if(chk_Button.checked){
        Calcurator_Button.hidden = false;
    }
    else{
        Calcurator_Button.hidden = true;
    }
}

//階乗(ガンマ関数というもので階乗の定義を正の実数まで拡大できるみたいで好奇心で追加しました)
//構造はよくわかっていません。↓原理としてはこうなっているみたいです。
//https://manabitimes.jp/math/960
function Factorial(x) {
    // 入力の健全性
    if (!Number.isFinite(x)) return NaN;

    // ほぼ整数を整数として扱う（丸め誤差対策）
    const EPS = 1e-12;
    if (Math.abs(x - Math.round(x)) < EPS) x = Math.round(x);

    // 定義域チェック（負の整数は未定義）
    if (x < 0 && Number.isInteger(x)) {
        // 未定義：NaNを返すか、例外にする
        // throw new Error("負の整数の階乗は未定義です");
        return NaN;
    }

    // 0! = 1
    if (x === 0) return 1;

    // 小～中規模の正の整数は厳密に計算（誤差なし）
    if (Number.isInteger(x) && x > 0) {
        // 171以上はInfinity（IEEE754の範囲外）
        if (x >= 171) return Infinity;
        let r = 1;
        for (let i = 2; i <= x; i++) r *= i;
        return r;
    }

    // 実数（非整数）はガンマ関数で近似
    return gamma(x + 1);
};

function gamma(z) {
    // ランツォス近似
    const p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    const g = 7;

    if (z < 0.5) {
        // 反射公式（極：z が 0,-1,-2,... では発散）
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }

    z -= 1;
    let x = p[0];
    for (let i = 1; i < p.length; i++) {
        x += p[i] / (z + i);
    }

    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

//メモリに格納(ローカルストレージに保存)
function SaveMemory(AIntNum ,AIntMode){
    let DIntClucMemory = AIntNum; 
    const DIntMemory = {Memory : 0};

    if(!isStrictNumber(AIntNum)){
        DIntClucMemory = 0;
    }

    //M+の場合はメモリーに加算、M-の場合魔メモリーに減算
    if(AIntMode === plus){
        DIntMemory.Memory = Memory_storage + DIntClucMemory;
    }
    else if(AIntMode === minu){
        DIntMemory.Memory = Memory_storage - DIntClucMemory;
    }
    else if(AIntMode === modeMemoryStore){
        DIntMemory.Memory = DIntClucMemory;
    }

    Display_Exist_Memory.innerText = Memory_Exsist_check(DIntMemory.Memory);

    localStorage.setItem("Calucrator_Memory", JSON.stringify(DIntMemory));
    
    return DIntMemory.Memory;
}

function Memory_Exsist_check(AClucMemory){
    // 数値に変換
    const num = Number(AClucMemory);

    // null, undefined, NaN, 0 の場合は表示しない
    if(!chk_DisplayMemory.checked){
        if (!isNaN(num) && num !== 0) {
            return "M";
        }
    }
    return "";
}

//数値判定
function isStrictNumber(val) {
    return typeof val === "number" && Number.isFinite(val);
}

//メモリの数字を出力
function LoadMemory(){
    const Memory = JSON.parse(localStorage.getItem("Calucrator_Memory"));
    
    if(Memory){
        Display_Exist_Memory.innerText = Memory_Exsist_check(Memory.Memory);
        return Memory.Memory;
    }
    else{
        return 0;
    }
}

//メモリをクリア(ローカルストレージを削除)
function MemoryClear(){
    localStorage.removeItem("Calucrator_Memory");
    Memory_storage = 0;
    showMemory(0);
    Display_Exist_Memory.innerText = "";
}

//設定をメモリに格納(ローカルストレージに保存)
function SaveSetting(){
    const DIntSerring = {
        Round : chk_round.checked 
        ,DisplayMemory :chk_DisplayMemory.checked
        ,DisplayFunction :chk_DisplayFunction.checked
        ,DisplayError: chk_Error.checked
        ,DisplayCommand: chk_Command.checked
        ,DisplayButton: chk_Button.checked
        ,DisplaySetting: detail_setting.open
        ,CalcrateDegree: chk_Degree.checked
        ,DisplayInfinity: chk_Infinity.checked
        ,DisplayZero: chk_Zero.checked
    }

    localStorage.setItem("Calucrator_Setting", JSON.stringify(DIntSerring));
}

//設定をメモリを出力
function LoadSetting(){

    const Memory = JSON.parse(localStorage.getItem("Calucrator_Setting"));
    if(Memory){
        chk_round.checked = Memory.Round;
        chk_DisplayMemory.checked =  Memory.DisplayMemory;
        chk_DisplayFunction.checked =  Memory.DisplayFunction;
        chk_Error.checked =  Memory.DisplayError;
        chk_Command.checked = Memory.DisplayCommand;
        chk_Button.checked = Memory.DisplayButton;
        detail_setting.open = Memory.DisplaySetting;
        chk_Degree.checked = Memory.CalcrateDegree;
        chk_Infinity.checked = Memory.DisplayInfinity;
        chk_Zero.checked = Memory.DisplayZero;
    }

    DisplayMemory_hidden();
    DisplayFunction_hidden();
    DisplayCommand_hidden();
    DisplayButton_hidden()
}

//ガウス記号
//定義：n≦x<n+1 を満たす整数 n のことを [x]と書きます
function Floor(AFloorNum){
    let DIntNum = parseInt(AFloorNum)

    if(AFloorNum - DIntNum == 0){
        return AFloorNum
    }
    else{
        if(AFloorNum >= 0){
            return DIntNum;
        }
        else{
            return DIntNum - 1;
        }
    }
}

//コマンドの候補を表示する
function SuggestCommand() {
    const input = add_function_command.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (input.length === 0) {
        suggestionBox.hidden = true;
        return;
    }

    // コマンドと説明の一覧（配列形式に修正）
    const matches = commandList.filter(item => item.cmd.toLowerCase().includes(input));

    //コマンドの候補がない場合は非表示にする
    if (matches.length === 0) {
        suggestionBox.hidden = true;
        return;
    }

    matches.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${item.cmd}</strong><br><span class="cmd-desc">${item.desc}</span>`;
        div.classList.add("suggestion-item");
        div.addEventListener("click", () => {
            add_function_command.value = item.cmd;
            suggestionBox.innerHTML = "";
            suggestionBox.hidden = true;
        });
        suggestionBox.appendChild(div);
    });

    suggestionBox.hidden = false;
}


//入力欄に表示されている数字の“正確な数値”を取得する
function getExact() {
  const d = add_number.dataset && add_number.dataset.exact;
  const n = Number(d);
  return (d !== undefined && !Number.isNaN(n))
    ? n
    : parseFloat(add_number.value);
}

// NUM=値 LEN=桁数
function zeroPadding(NUM, LEN ,XX){
	return ( Array(LEN).join(XX) + NUM ).slice( -LEN );
}

//乱数生成
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// 表示フォーマッタ
function showResult(v) {
  const val = Number(v);
  add_number.dataset.exact = String(v); 

  const suppressErrorText = !isChecked(chk_Error);

  // ① 非有限（NaN / ±Infinity）
  if (!Number.isFinite(val)) {
    add_number.value = suppressErrorText ? "エラー" : String(val);
    return;
  }

  const absVal = Math.abs(val);

  // ② 閾値変換（丸めより優先／独立）
  // 2-1: 1.00e+16 より大きい → Infinity 表示
  if (isChecked(chk_Infinity) && absVal > 1e16) {
    add_number.value = suppressErrorText ? "エラー" : (val < 0 ? "-Infinity" : "Infinity");
    return;
  }
  // 2-2: 0より大きく 1.00e-16 以下 → 0 表示
  if (isChecked(chk_Zero) && absVal > 0 && absVal <= 1e-16) {
    add_number.value = "0";
    return;
  }

  // ③ 丸め OFF：そのまま（※ここでは指数表記にしない）
  if (!isChecked(chk_round)) {
    add_number.value = String(val);
    return;
  }

  // ④ 丸め ON：ここでだけ指数表記を許可
  if (absVal !== 0 && (absVal <= 1e-10 || absVal >= 1e10)) {
    add_number.value = val.toExponential(2); // 小数2桁（有効3桁）
    return;
  }

  // ⑤ 丸め ON の通常表記（最大10桁、小数点と末尾0を整理）
  let s = val.toFixed(10);
  s = s.replace(/\.?0+$/, "");
  add_number.value = s;
}

//メモリー表示
function showMemory(v) {
  const val = Number(v);
  add_memory.dataset.exact = String(v);

  const suppressErrorText = !isChecked(chk_Error);

  // ① 非有限（NaN / ±Infinity）
  if (!Number.isFinite(val)) {
    add_memory.value = suppressErrorText ? "エラー" : String(val);
    return;
  }

  const absVal = Math.abs(val);

  // ② Infinity変換（丸め設定より優先）
  if (isChecked(chk_Infinity) && absVal > 1e16) {
    add_memory.value = suppressErrorText ? "エラー" : (val < 0 ? "-Infinity" : "Infinity");
    return;
  }

  // ③ Zero変換
  if (isChecked(chk_Zero) && absVal > 0 && absVal <= 1e-16) {
    add_memory.value = "0";
    return;
  }

  // ④ 丸めOFF → そのまま表示（指数表記なし）
  if (!isChecked(chk_round)) {
    add_memory.value = String(val);
    return;
  }

  // ⑤ 丸めON → この時だけ指数表記許可
  if (absVal !== 0 && (absVal <= 1e-10 || absVal >= 1e10)) {
    add_memory.value = val.toExponential(2); // 小数点第2位まで
    return;
  }

  // ⑥ 丸めONの通常表記（最大10桁、小数点と末尾0を整理）
  let s = val.toFixed(10);
  s = s.replace(/\.?0+$/, "");
  add_memory.value = s;
}


function UnitConvertion_function(num ,codeA, codeB){
    //長さ
    // km
    if (codeA == unit_km) {
        if (codeB == unit_km) return num;
        else if (codeB == unit_m) return num * 1000;
        else if (codeB == unit_Cm) return num * 100000;
        else if (codeB == unit_mm) return num * 1000000;
        else if (codeB == unit_inch) return num * 39370.0787;
        else if (codeB == unit_Feet) return num * 3280.8399;
        else if (codeB == unit_yard) return num * 1093.6133;
        else if (codeB == unit_mile) return num / 1.609344;
    }


    // m
    else if (codeA == unit_m) {
        if (codeB == unit_km) return num / 1000;
        else if (codeB == unit_m) return num;
        else if (codeB == unit_Cm) return num * 100;
        else if (codeB == unit_mm) return num * 1000;
        else if (codeB == unit_inch) return num * 39.3700787;
        else if (codeB == unit_Feet) return num * 3.2808399;
        else if (codeB == unit_yard) return num * 1.0936133;
        else if (codeB == unit_mile) return num / 1609.344;
    }

    // cm
    else if (codeA == unit_Cm) {
        if (codeB == unit_km) return num / 100000;
        else if (codeB == unit_m) return num / 100;
        else if (codeB == unit_Cm) return num;
        else if (codeB == unit_mm) return num * 10;
        else if (codeB == unit_inch) return num / 2.54;
        else if (codeB == unit_Feet) return num / 30.48;
        else if (codeB == unit_yard) return num / 91.44;
        else if (codeB == unit_mile) return num / 160934.4;
    }

    // mm
    else if (codeA == unit_mm) {
        if (codeB == unit_km) return num / 1000000;
        else if (codeB == unit_m) return num / 1000;
        else if (codeB == unit_Cm) return num / 10;
        else if (codeB == unit_mm) return num;
        else if (codeB == unit_inch) return num / 25.4;
        else if (codeB == unit_Feet) return num / 304.8;
        else if (codeB == unit_yard) return num / 914.4;
        else if (codeB == unit_mile) return num / 1609344;
    }

    // inch
    else if (codeA == unit_inch) {
        if (codeB == unit_km) return num * 0.0000254;
        else if (codeB == unit_m) return num * 0.0254;
        else if (codeB == unit_Cm) return num * 2.54;
        else if (codeB == unit_mm) return num * 25.4;
        else if (codeB == unit_inch) return num;
        else if (codeB == unit_Feet) return num / 12;
        else if (codeB == unit_yard) return num / 36;
        else if (codeB == unit_mile) return num / 63360;
    }

    // feet
    else if (codeA == unit_Feet) {
        if (codeB == unit_km) return num * 0.0003048;
        else if (codeB == unit_m) return num * 0.3048;
        else if (codeB == unit_Cm) return num * 30.48;
        else if (codeB == unit_mm) return num * 304.8;
        else if (codeB == unit_inch) return num * 12;
        else if (codeB == unit_Feet) return num;
        else if (codeB == unit_yard) return num / 3;
        else if (codeB == unit_mile) return num / 5280;
    }

    // yard
    else if (codeA == unit_yard) {
        if (codeB == unit_km) return num * 0.0009144;
        else if (codeB == unit_m) return num * 0.9144;
        else if (codeB == unit_Cm) return num * 91.44;
        else if (codeB == unit_mm) return num * 914.4;
        else if (codeB == unit_inch) return num * 36;
        else if (codeB == unit_Feet) return num * 3;
        else if (codeB == unit_yard) return num;
        else if (codeB == unit_mile) return num / 1760;
    }

    // mile
    else if (codeA == unit_mile) {
        if (codeB == unit_km) return num * 1.609344;
        else if (codeB == unit_m) return num * 1609.344;
        else if (codeB == unit_Cm) return num * 160934.4;
        else if (codeB == unit_mm) return num * 1609344;
        else if (codeB == unit_inch) return num * 63360;
        else if (codeB == unit_Feet) return num * 5280;
        else if (codeB == unit_yard) return num * 1760;
        else if (codeB == unit_mile) return num;
    }

    //体積
    // 体積単位の変換
    else if (codeA == unit_mmm) {
        if (codeB == unit_mmm) return num;
        else if (codeB == unit_Cmmm) return num * 1000000;
        else if (codeB == unit_L) return num * 1000;
        else if (codeB == unit_mL) return num * 1000000;
        else if (codeB == unit_gal) return num * 264.172052;
    }
    else if (codeA == unit_Cmmm) {
        if (codeB == unit_mmm) return num / 1000000;
        else if (codeB == unit_Cmmm) return num;
        else if (codeB == unit_L) return num / 1000;
        else if (codeB == unit_mL) return num;
        else if (codeB == unit_gal) return num / 3785.41178;
    }
    else if (codeA == unit_L) {
        if (codeB == unit_mmm) return num / 1000;
        else if (codeB == unit_Cmmm) return num * 1000;
        else if (codeB == unit_L) return num;
        else if (codeB == unit_mL) return num * 1000;
        else if (codeB == unit_gal) return num / 3.78541178;
    }
    else if (codeA == unit_mL) {
        if (codeB == unit_mmm) return num / 1000000;
        else if (codeB == unit_Cmmm) return num;
        else if (codeB == unit_L) return num / 1000;
        else if (codeB == unit_mL) return num;
        else if (codeB == unit_gal) return num / 3785.41178;
    }
    else if (codeA == unit_gal) {
        if (codeB == unit_mmm) return num / 264.172052;
        else if (codeB == unit_Cmmm) return num * 3785.41178;
        else if (codeB == unit_L) return num * 3.78541178;
        else if (codeB == unit_mL) return num * 3785.41178;
        else if (codeB == unit_gal) return num;
    }

    // [時間] Time conversion
    else if (codeA == unit_day) {
        if (codeB == unit_day) return num;
        else if (codeB == unit_hour) return num * 24;
        else if (codeB == unit_minute) return num * 24 * 60;
        else if (codeB == unit_second) return num * 24 * 60 * 60;
    }
    else if (codeA == unit_hour) {
        if (codeB == unit_day) return num / 24;
        else if (codeB == unit_hour) return num;
        else if (codeB == unit_minute) return num * 60;
        else if (codeB == unit_second) return num * 60 * 60;
    }
    else if (codeA == unit_minute) {
        if (codeB == unit_day) return num / (24 * 60);
        else if (codeB == unit_hour) return num / 60;
        else if (codeB == unit_minute) return num;
        else if (codeB == unit_second) return num * 60;
    }
    else if (codeA == unit_second) {
        if (codeB == unit_day) return num / (24 * 60 * 60);
        else if (codeB == unit_hour) return num / (60 * 60);
        else if (codeB == unit_minute) return num / 60;
        else if (codeB == unit_second) return num;
    }

    // [容量] Data size conversion logic
    else if (codeA == unit_bit) {
        if (codeB == unit_bit) return num;
        else if (codeB == unit_byte) return num / 8;
        else if (codeB == unit_KB) return num / (8 * 1024);
        else if (codeB == unit_MB) return num / (8 * 1024 ** 2);
        else if (codeB == unit_GB) return num / (8 * 1024 ** 3);
        else if (codeB == unit_TB) return num / (8 * 1024 ** 4);
    }
    else if (codeA == unit_byte) {
        if (codeB == unit_bit) return num * 8;
        else if (codeB == unit_byte) return num;
        else if (codeB == unit_KB) return num / 1024;
        else if (codeB == unit_MB) return num / (1024 ** 2);
        else if (codeB == unit_GB) return num / (1024 ** 3);
        else if (codeB == unit_TB) return num / (1024 ** 4);
    }
    else if (codeA == unit_KB) {
        if (codeB == unit_bit) return num * 1024 * 8;
        else if (codeB == unit_byte) return num * 1024;
        else if (codeB == unit_KB) return num;
        else if (codeB == unit_MB) return num / 1024;
        else if (codeB == unit_GB) return num / (1024 ** 2);
        else if (codeB == unit_TB) return num / (1024 ** 3);
    }
    else if (codeA == unit_MB) {
        if (codeB == unit_bit) return num * 1024 ** 2 * 8;
        else if (codeB == unit_byte) return num * 1024 ** 2;
        else if (codeB == unit_KB) return num * 1024;
        else if (codeB == unit_MB) return num;
        else if (codeB == unit_GB) return num / 1024;
        else if (codeB == unit_TB) return num / (1024 ** 2);
    }
    else if (codeA == unit_GB) {
        if (codeB == unit_bit) return num * 1024 ** 3 * 8;
        else if (codeB == unit_byte) return num * 1024 ** 3;
        else if (codeB == unit_KB) return num * 1024 ** 2;
        else if (codeB == unit_MB) return num * 1024;
        else if (codeB == unit_GB) return num;
        else if (codeB == unit_TB) return num / 1024;
    }
    else if (codeA == unit_TB) {
        if (codeB == unit_bit) return num * 1024 ** 4 * 8;
        else if (codeB == unit_byte) return num * 1024 ** 4;
        else if (codeB == unit_KB) return num * 1024 ** 3;
        else if (codeB == unit_MB) return num * 1024 ** 2;
        else if (codeB == unit_GB) return num * 1024;
        else if (codeB == unit_TB) return num;
    }

    // [温度] Temperature conversion logic
    else if (codeA == unit_C) {
        if (codeB == unit_C) return num;
        else if (codeB == unit_F) return num * 9 / 5 + 32;
        else if (codeB == unit_K) return num + 273.15;
    }
    else if (codeA == unit_F) {
        if (codeB == unit_C) return (num - 32) * 5 / 9;
        else if (codeB == unit_F) return num;
        else if (codeB == unit_K) return (num - 32) * 5 / 9 + 273.15;
    }
    else if (codeA == unit_K) {
        if (codeB == unit_C) return num - 273.15;
        else if (codeB == unit_F) return (num - 273.15) * 9 / 5 + 32;
        else if (codeB == unit_K) return num;
    }

    // [角度]
    else if(codeA == unit_deg){
        if (codeB == unit_deg) return num;
        else if (codeB == unit_rad) return num * (Math.PI / 180);
    }
    else if(codeA == unit_rad){
        if (codeB == unit_deg) return  num * (180 / Math.PI);
        else if (codeB == unit_rad) return num;
    }
    // その他未対応
    return NaN;
}

//三角関数
function MathTrigonometric(deg ,mode){
    let Drad = deg;

    //通常の三角関数
    if(mode == tri_sin){
        Drad = DEGRAD(Drad);
        return Math.sin(Drad);
    }
    else if(mode == tri_cos){
        Drad = DEGRAD(Drad);
        return Math.cos(Drad);
    }
    else if(mode == tri_tan){
        Drad = DEGRAD(Drad);
        return Math.tan(Drad);
    }

    //三角関数(アーク)
    else if(mode == tri_arcsin){
        Drad = Math.asin(Drad);
        return RADDEG(Drad);
    }
    else if(mode == tri_arccos){
        Drad = Math.acos(Drad);
        return RADDEG(Drad);
    }
    else if(mode == tri_arctan){
        Drad = Math.atan(Drad);
        return RADDEG(Drad);
    }

    //三角関数(逆数)
    if(mode == tri_sec){
        Drad = DEGRAD(Drad);
        return 1 / Math.sin(Drad);
    }
    else if(mode == tri_csc){
        Drad = DEGRAD(Drad);
        return 1 / Math.cos(Drad);
    }
    else if(mode == tri_cot){
        Drad = DEGRAD(Drad);
        return 1 / Math.tan(Drad);
    }

    //双曲線関数
    else if(mode == tri_sinh){
        Drad = DEGRAD(Drad);
        return Math.sinh(Drad);
    }
    else if(mode == tri_cosh){
        Drad = DEGRAD(Drad);
        return Math.cosh(Drad);
    }
    else if(mode == tri_tanh){
        Drad = DEGRAD(Drad);
        return Math.tanh(Drad);
    }

    //逆双曲線関数
    else if(mode == tri_arcsinh){
        Drad = Math.asinh(Drad);
        return RADDEG(Drad);
    }
    else if(mode == tri_arccosh){
        Drad = Math.acosh(Drad);
        return RADDEG(Drad);
    }
    else if(mode == tri_arctanh){
        Drad = Math.atanh(Drad);
        return RADDEG(Drad);
    }

    else{
        return NaN;
    }

}

function DEGRAD(deg){
    if(chk_Degree.checked){
        return deg;
    }
    else{
        return deg * (Math.PI / 180);
    }
}

function RADDEG(deg){
    if(chk_Degree.checked){
        return deg;
    }
    else{
        return deg * (180 / Math.PI);
    }
}

function getWrapper() {
    const el = document.getElementById(WRAPPER_ID);
    if (!el) {
        console.warn(`[WARN] #${WRAPPER_ID} が見つかりません。HTMLにラッパーを追加してください。`);
    }
    return el;
}

/** すべての効果を除去（classとtransform、アニメをクリア） */
function resetEffects() {
    const el = getWrapper();
    if (!el) return;

    el.classList.remove(
        "effect-spin-once",
        "effect-spin-onehalf",
        "effect-spin-infinite",
        "effect-askew",
        "effect-reset"
    );
    // アニメ強制リセットテクニック（reflow）
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
    // 角度等クリア
    el.style.transform = "";
}

/** 一度だけクラスを付けて、アニメ終了で自動除去 */
function playOnce(effectClass) {
    const el = getWrapper();
    if (!el) return;

    resetEffects();
    el.classList.add(effectClass);

  // animationendでクラスを外す（1回転 / 1.5回転 用）
    const onEnd = () => {
        el.classList.remove(effectClass);
        el.removeEventListener("animationend", onEnd);
    };
    el.addEventListener("animationend", onEnd);
}

function playHalfRotation() {
    const el = getWrapper();
    if (!el) return;

    resetEffects();
    el.classList.add("effect-spin-onehalf");
}


/** 無限回転のトグル（ON/OFF） */
function toggleInfiniteSpin() {
    const el = getWrapper();
    if (!el) return;

    // 既に無限回転ならOFF、そうでなければON
    if (el.classList.contains("effect-spin-infinite")) {
        el.classList.remove("effect-spin-infinite");
        // 念のため他のアニメ状態も解除
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
    } 
    else {
        resetEffects();
        el.classList.add("effect-spin-infinite");
    }
}

/** askew: 15〜30度でランダム傾き（左右もランダム） */
function applyAskew() {
    const el = getWrapper();
    if (!el) return;

    resetEffects();
    el.classList.add("effect-askew");

    const deg = 15 + Math.random() * 15; // 15〜30
    const sign = Math.random() < 0.5 ? -1 : 1;
    el.style.transform = `rotate(${sign * deg}deg)`;
}

