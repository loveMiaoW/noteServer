$.ajax({
  // 请求笔记列表
  type: 'post',
  url: './getSidebar'
}).done(function (sidebar) {
  // plugin: 搜索 api，注册回调
  // let searchPlugin = {
  //   name: 'searchPlugin',
  //   extend: (api) => {
  //     api.enableSearch({
  //       handler: key => {
  //         if (!(key.trim())) {
  //           return [];
  //         }
  //         return new Promise((resolve, reject) => {
  //           $.ajax({
  //             // 请求搜索接口
  //             type: 'get',
  //             url: './search',
  //             data: {
  //               key
  //             },
  //             success(data) {
  //               resolve(data);
  //             },
  //             error(xhr) {
  //               reject('请求 search 路由出错：');
  //               console.error('请求 search 路由出错：');
  //               console.error(xhr);
  //             }
  //           })
  //         });
  //       }
  //     });
  //   }
  // }
  // plugin: 页面刷新 api，用来刷新 valine 及渲染 mermaid latexß
  let refreshValine = {
    name: 'refreshValine',
    extend(api) {
      api.onContentUpdated(() => {
        // 刷新 github-calendar

        // 刷新 valine

        // parse mermaid
        mermaid.init(undefined, '.mermaid');

        // parse latex
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      });

      // 由于 \\ 将被转义为一个 \，故将所有 latex 的 \\ 转换为 \\\\，供 katex 正常解析
      api.processMarkdown(markdown => markdown.replace(/(\$\$)[^\$]*(\$\$)/g, latex => latex.replace(/\\\\/g, '\\\\\\\\')));
    },
  }

  // plugin: Marked 渲染器，用于替换 mermaid 标签的类名
  let onParseCode = {
    name: 'onParseCode',
    extend(api) {
      api.extendMarkedRenderer((render) => {
        let oldProcess = render.code.bind(render);
        render.code = function (code, language, n, i) {
          if (language == 'mermaid') {
            // var graph = mermaid.mermaidAPI.render('graphDiv', code);
            return '<div class="mermaid" >' + code + '</div>';
          } else {
            return oldProcess(code, language, n, i);
          }
        };
      })
    }
  }


  let options = {
    sourcePath: '../doc',
    tocVisibleDepth: 4,
    disableSidebarToggle: true,
    sidebar,
    layout: 'wide',
    highlight: ['javascript', 'java', 'cpp', 'python', 'json', 'bash', 'php', 'html', 'css', 'sql', 'typescript', 'go'],
    target: '#content',
    darkThemeToggler: true,
    title: 'LOVEMIAOW的笔记本',
    nav: [{
      title: '首页',
      link: '/'
    },{
      title: 'github',
      link: 'https://github.com/loveMiaoW'
    }],
    plugins: [
      // searchPlugin,
      refreshValine,
      onParseCode,
    ],
  };


  // Docute init
  new Docute(options);
  // 提供 valine 的容器
  $('#content .Content').append(`
    <hr>
    <div id="" class="leancloud_visitors" style="padding: 5px 10px; margin: 15px 0;text-align: center; background:rgba(0, 150, 136, .05); border-radius: 5px;">
        文章被点了
        <i class="leancloud-visitors-count" style="color: #009688;">loading...</i>
        次
    </div>
    <div id="vcomments"></div>
    `);

  // Sidebar 侧边栏操作
  // 关闭所有未选中的目录项
  $('.Sidebar .SidebarItems .open').filter((i, e) => $(e).parent().siblings('.ItemChildren').find('.active').length == 0).click();
  // 滚动到 active 的项目上
  setTimeout(() => {
    let activeTop = $('.Sidebar .SidebarItems .active').parent().parent().siblings('.ItemTitle').offset() == undefined
      ? 0
      : $('.Sidebar .SidebarItems .active').parent().parent().siblings('.ItemTitle').offset().top;

    let sidebarTop = $('.Sidebar').offset() == undefined
      ? 0
      : $('.Sidebar').offset().top;

    $('.Sidebar').animate({
      scrollTop: activeTop - sidebarTop + $('.Sidebar').scrollTop() - 10,
    }, 1500);
  }, 0);



  // 由于 docute onContentUpdated 接口回调功能存在 bug，无法有效刷新渲染，这里两秒自动渲染一次
  setInterval(() => {
    // parse mermaid
    mermaid.init(undefined, '.mermaid');

    // parse latex
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }, 2000);
});
