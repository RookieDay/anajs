        // 在正则表达式中
        // ^		表示必须以某某开头
        // $		表示必须以某某结尾

        /*	 var r1 = /^a/;	// 专门匹配以 a 开头的字符串
        	 console.log( r1.exec( 'abc' ) );
        	 console.log( r1.exec( 'bac' ) );
        	*/
        // 
        // var r2 = /a$/;	// 必须以 a 结尾的字符串


        // 例如要验证邮箱
        // 正则: [^@]+@[^@]+
        // str = "jim@123.com, tom@123.com"
        // 验证的一般是一个邮箱

        var r = /^([^@]+)@([^@]+)$/;
        // /^([^@+])@([^@+])$/
        var str = "jim@123.com, tom@123.com";

        var m = r.exec(str);