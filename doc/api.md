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

```json
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

```json
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

```json
{
	data: [{
		id: 1,
		versionId: '123101',
		content: {
			'x192': [{
				id: 1,
				title: '',
				content: '',
				createTime: ''
			},
			...
			]
		}
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

```json
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

## 添加

### 添加文案
> saveContent

- 入参

```json
{
	versionId: 1,
	contentKey: 'x123x'
	content: [{
		contentText: 'test',
		language: 'en'
	},
	...
	]
}
```

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

### 添加一个版本
> saveVersionInfo

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
projectId|String|1|required|项目id
version|String|test|required|版本号

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```



### 添加一个项目
> saveProject

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
name|String|test|required|项目名

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

### 添加一条类目
> saveCategory

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
versionId|Number|1|required|版本id
name|String|xxx页面|required|类目名称
pid|Number|1|-|父级类目id（如果没有传入的话则默认为0）

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

## 删除

### 删除一条文案
> deleteContent

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
id|String|1|required|文案id

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

### 删除一个文案key
> deleteContentKey

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
id|String|1|required|文案key值id

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

### 删除一个版本
> deleteVersionInfo

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
id|String|1|required|版本id

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

### 删除一个项目
> deleteProject

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
id|String|1|required|项目id

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

## 修改

### 修改文案

> updateContent

- 入参

```json
{
	versionId: 1,
	contentKey: 'x123x'
	content: [{
		contentText: 'test',
		language: 'en'
	},
	...
	]
}
```

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```
### 修改项目 

> updateProject

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
projectId|Number|1|required|项目id
name|String|test|required|项目名

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```

### 修改版本

> updateVersion

- 入参

参数|类型|样例|校验|备注
:--|:--|:--|:--|:--
projectId|String|1|required|项目id
version|String|test|required|版本号

- 出参

```json
{
	data: true,	// 操作结果
	statusNo: 1,	// 状态
	statusMsg: ''	// 状态文案
}
```


## 功能

### 版本同步
### 导入 导出
