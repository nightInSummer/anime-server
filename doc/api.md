接口文档
==========================
## 查询

### 获取新闻
>/api/news [GET]

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
-|-|-|-|-

- 出参

```js
{
  data: [{
    id: 1,
    title: ''
    content: '',
    createTime: '',
    status: '' // status为1是已发布新闻，0是未发布新闻
  },
  ...
  ],
  statusMsg: '',
  statusNo: 1
}
```


### 查询轮播图
> /api/sowing [GET]

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
-|-|-|-|-

- 出参

```js
{
  data: [{
    id: 1,
    title: '',
    image: '', // 图片路径
    url: '', // 跳转路径
    createTime: ''
  },
  ...
  ],
  statusMsg: '',
  statusNo: 1
}
```

### 查询公司介绍
> /api/company [GET]

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
-|-|-|-|-

- 出参

```js
{
  data: [{
    id: 1,
    title: '',
    cotent: '',
    createTime: ''
  },
  ...
  ],
  statusMsg: '',
  statusNo: 1
}
```

### 查询活动
> /api/activity [GET]

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
-|-|-|-|-

- 出参

```js
{
  data: [{
    id: 1,
    title: '',
    createTime: '',
    activityValues: [{
      id: 1,
      title: '',
      content: '',
      createTime: ''
    }
    ...
    ]
  }
  ...
  ]
  statusMsg: '',
  statusNo: 1
}
```

### 查询招聘信息
> /api/recruit [GET]

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
-|-|-|-|-

- 出参

```js
{
  data: [{
    id: 1,
    title: ''
    content: '',
    createTime: '',
    status: '' // status为1是已发布信息，0是未发布信息
  },
  ...
  ],
  statusMsg: '',
  statusNo: 1
}
