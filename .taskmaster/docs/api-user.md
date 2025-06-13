# 1. 用户 API 文档

## 1.1. 批量查询用户应用可见性

接口名称：批量查询用户应用可见性
请求方式：POST
接口地址：/gateway/user/app/exists
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
```ts
z.object({
  userIds: z.array(z.string()).optional().describe('用户 ID 数组')
})
```
返回结果：
```ts
z.object({
  result: z.record(z.string(), z.boolean()).describe('用户ID与应用可见性的映射, key 为用户ID, value 为布尔值表示是否可见'),
  message: z.string().describe('响应消息'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.2. 根据邮箱获取用户 ID

接口名称：根据邮箱获取用户 ID
请求方式：GET
接口地址：/gateway/user/getid
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式 (Query Parameters)：
```ts
z.object({
  email: z.string().describe('用户邮箱')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('用户ID')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.3. 根据用户 ID 用户的详细信息

接口名称：根据用户 ID 用户的详细信息
请求方式：GET
接口地址：/gateway/user/info
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式 (Query Parameters)：
```ts
z.object({
  userId: z.string().describe('用户ID')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('用户 ID'),
    avatarUrl: z.string().describe('用户头像 URL'),
    name: z.string().describe('用户昵称')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.4. 查询用户信息

接口名称：查询用户信息
请求方式：GET
接口地址：/gateway/user/query
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式 (Query Parameters)：
```ts
z.object({
  email: z.string().optional().describe('用户邮箱')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    userId: z.string().describe('用户ID'),
    avatarUrl: z.string().describe('用户头像URL'),
    name: z.string().describe('用户昵称')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.5. 批量查询用户信息

接口名称：批量查询用户信息
请求方式：POST
接口地址：/gateway/user/batchQuery
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
```ts
z.object({
  ids: z.array(z.string()).optional().describe('用户 ID 数组，根据用户 ID 查询时必填'),
  openIds: z.array(z.string()).optional().describe('用户 openId 数组，根据 openId 查询时必填'),
  pageSize: z.number().optional().describe('分页大小，默认为 30， 最大为 1000'),
  pageToken: z.string().optional().describe('分页 token, 用于获取下一页数据')
})
```
返回结果：
```ts
z.object({
  result: z.array(
    z.object({
      userId: z.string().describe('用户ID'),
      avatarUrl: z.string().describe('用户头像URL'),
      name: z.string().describe('用户昵称'),
      birthday: z.string().optional().describe('用户生日，需要用户授权'),
      email: z.string().optional().describe('用户email，需要用户授权'),
      location: z.string().optional().describe('用户位置，需要用户授权'),
      phone: z.string().optional().describe('用户手机号，需要用户授权'),
      title: z.string().optional().describe('用户职位'),
      openId: z.string().optional().describe('openId')
    })
  ).describe('结果集'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.6. 获取三方账号的信息

接口名称：获取三方账号的信息
请求方式：GET
接口地址：/gateway/user/thirdAccount/info
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式 (Query Parameters)：
```ts
z.object({
  openId: z.string().describe('三方账号 ID'),
  refer: z.string().describe('三方账号来源')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('绑定关系存储模型 ID'),
    userId: z.string().describe('用户 ID'),
    openId: z.string().describe('三方账号 ID'),
    refer: z.string().describe('绑定关系'),
    extra: z.object({}).optional().describe('其他信息'),
    showname: z.string().describe('用户名称'),
    created: z.string().describe('创建时间'),
    updated: z.string().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.7. 根据用户 ID 查询用户设置

接口名称：根据用户 ID 查询用户设置
请求方式：GET
接口地址：/gateway/user/preferences
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID')
})
```
入参格式 (Query Parameters)：
```ts
z.object({
  userId: z.string().describe('用户ID')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    userId: z.string().describe('用户ID'),
    language: z.string().describe('用户所选展示语言'),
    lastWorkspace: z.string().describe('用户最后使用的工作空间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.8. 根据用户唯一识别查询基本信息

接口名称：根据用户唯一识别查询基本信息
请求方式：GET
接口地址：/gateway/user/info/byUniqueField
请求头：
```ts
z.object({})
```
入参格式 (Query Parameters)：
```ts
z.object({
  selectBy: z.string().describe('查询参数类型，目前支持 \'_id\', \'openId\', \'username\', \'email\', \'phone\''),
  value: z.string().describe('查询参数值')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().optional().describe('用户ID'),
    avatarUrl: z.string().optional().describe('用户头像URL'),
    dingUid: z.number().optional().describe('钉钉UID'),
    email: z.string().optional().describe('用户邮箱'),
    emails: z.array(
      z.object({
        id: z.string().describe('用户ID'),
        email: z.string().describe('用户邮箱'),
        openId: z.string().describe('用户OpenId'),
        state: z.number().describe('邮箱认证状态')
      })
    ).optional().describe('邮箱列表'),
    employeeId: z.string().optional().describe('员工ID'),
    isBlock: z.number().optional().describe('是否冻结'),
    name: z.string().optional().describe('用户昵称'),
    openId: z.string().optional().describe('OpenID'),
    phone: z.string().optional().describe('用户手机号'),
    username: z.string().optional().describe('用户名')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 1.9. 查询 IDMap

接口名称：查询 IDMap
请求方式：GET
接口地址：/gateway/idmap/query
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式 (Query Parameters)：
```ts
z.object({
  tbId: z.string().optional().describe('用户在 Teambition 中的用户 ID'),
  refId: z.string().optional().describe('绑定关系标识符，比如钉钉企业的 corpId'),
  refer: z.string().describe('绑定的类型，常见的 refer 类型： dingTalk-corp 钉钉企业 dingTalk-team 钉钉部门 dingTalk-user 钉钉用户'),
  extraUserId: z.string().optional().describe('tb 方绑定的 id，比如钉钉平台返回的用户 staffId')
})
```
返回结果：
```ts
z.object({
  result: z.array(
    z.object({
      id: z.string().describe('IDMap ID'),
      tbId: z.string().describe('绑定的 tbId'),
      refId: z.string().describe('绑定关系 ID'),
      refer: z.string().describe('绑定关系'),
      extra: z.object({
        userId: z.string().optional().describe('tb 方绑定的 id，比如钉钉平台返回的用户 staffId')
      }).describe('第三方信息，返回对象内参数不统一，根据实际需求查看返回值')
    })
  ).describe('用户 IDMap 信息'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```
