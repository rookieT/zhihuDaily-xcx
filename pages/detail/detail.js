
const util = require( '../../utils/util.js' );


Page({
    data: {
        // text:"这是一个页面"
        data: [],
        databody: null,
        winHeight: 0,   // 设备高度
    },
    onLoad:function(options){
        // 页面初始化 options 为页面跳转所带来的参数
        var that = this
        var id = options.id;

        // 请求内容数据
        util.Ajax( "news/" + id, function( res ) {
            
            console.log(res.data.body)

            var arr = res.data;
            var body = arr.body;
            body = body.match( /<p>.*?<\/p>/g );
            var ss = [];
            for( var i = 0, len = body.length; i < len;i++ ) {

                ss[ i ] = /<img.*?>/.test( body[ i ] );

                if( ss[ i ] ) {
                    body[ i ] = body[ i ].match( /(http:|https:).*?\.(jpg|jpeg|gif|png)/ );
                } else {
                    body[ i ] = body[ i ].replace( /<p>/g, '' )
                        .replace( /<\/p>/g, '' )
                        .replace( /<strong>/g, '' )
                        .replace( /<\/strong>/g, '' )
                        .replace( /<a.*?\/a>/g, '' )
                        .replace( /&nbsp;/g, ' ' )
                        .replace( /&ldquo;/g, '"' )
                        .replace( /&rdquo;/g, '"' );
                }
            }

            console.log(body)
            console.log(arr)
            // 重新写入数据
            that.setData( {
                data: arr,
                databody: body
          });
        })
    
    }
})