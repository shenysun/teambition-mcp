# Teambition任务相关API

## 查询自由任务和项目任务详情

接口名称：查询自由任务和项目任务详情
请求方式：GET
接口地址：/gateway/all-task/query
请求头：
```ts
z.object({
  'x-operator-id': z.string().optional().describe('查询人ID, 如果存在会检查该成员可见的任务'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
```ts
z.object({
  taskId: z.string().describe('任务ID集合,使用逗号分隔')
})
```
返回结果：
```ts
z.object({
  result: z.array(z.object({
    id: z.string().describe('任务ID'),
    taskId: z.string().optional().describe('任务ID (已弃用)'),
    content: z.string().describe('任务标题'),
    note: z.string().describe('任务备注'),
    projectId: z.string().describe('项目ID'),
    ancestorIds: z.array(z.string()).describe('祖先任务ID列表'),
    parentTaskId: z.string().describe('父任务ID'),
    tfsId: z.string().describe('任务状态ID'),
    tasklistId: z.string().describe('任务分组ID'),
    stageId: z.string().describe('任务列ID'),
    tagIds: z.array(z.string()).describe('标签ID集合'),
    creatorId: z.string().describe('创建人ID'),
    executorId: z.string().describe('执行人ID'),
    involveMembers: z.array(z.string()).describe('参与者ID集合'),
    priority: z.number().int().describe('任务优先级'),
    storyPoint: z.string().describe('StoryPoint'),
    recurrence: z.array(z.string()).describe('重复规则列表'),
    isDone: z.boolean().describe('是否任务已完成'),
    isArchived: z.boolean().describe('是否任务放入回收站'),
    visible: z.string().describe('任务隐私性，\'involves\'表达仅参与者可见; \'members\'表达项目成员可见'),
    uniqueId: z.string().describe('任务数字ID'),
    startDate: z.string().describe('任务开始时间(UTC)'),
    dueDate: z.string().describe('任务截止时间(UTC)'),
    accomplishTime: z.string().describe('任务完成时间(UTC)'),
    created: z.string().describe('创建时间(UTC)'),
    updated: z.string().describe('更新时间(UTC)'),
    sfcId: z.string().describe('任务类型ID'),
    customfields: z.array(z.object({
      cfId: z.string().describe('自定义字段ID'),
      type: z.string().describe('自定义字段类型'),
      value: z.array(z.object({
        id: z.string().describe('字段值ID'),
        title: z.string().describe('字段值内容'),
        metaString: z.string().describe('字段值元属性')
      })).describe('字段值集合')
    })).describe('自定义字段值集合')
  })).describe('任务详情集合'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 归档任务(移入回收站)

接口名称：归档任务(移入回收站)
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/archive
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
(该接口无请求体参数)

返回结果：
```ts
z.object({
  result: z.object({
    updated: z.string().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 评论任务

接口名称：评论任务
请求方式：POST
接口地址：/gateway/v3/task/{taskId}/comment
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('评论人ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  content: z.string().optional().describe('评论内容'),
  renderMode: z.string().optional().describe('评论内容 原文 还是以 markdown 等格式. 默认是原文输出'),
  mentionUserIds: z.array(z.string()).optional().describe('评论 at 成员列表, 单次 at 上限30')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('动态ID'),
    creatorId: z.string().describe('创建人ID'),
    boundToObjectId: z.string().describe('绑定的对象ID'),
    boundToObjectType: z.string().describe('绑定对象类型，默认是task'),
    createTime: z.string().describe('创建时间(UTC)'),
    updateTime: z.string().describe('更新时间(UTC)'),
    content: z.object({
      title: z.string().describe('标题'),
      comment: z.string().describe('评论内容')
    }).describe('动态内容')
  }).describe('动态详情'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务标题

接口名称：更新任务标题
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/content
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  content: z.string().optional().describe('任务标题')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    content: z.string().describe('任务标题'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务标题响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 复制任务

接口名称：复制任务（仅支持工作流项目）
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/copy
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  tfsId: z.string().optional().describe('任务状态ID'),
  projectId: z.string().optional().describe('项目ID'),
  copyFields: z.array(z.string()).optional().describe('复制后保留的数据')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务ID'),
    content: z.string().describe('任务标题'),
    note: z.string().describe('任务备注'),
    projectId: z.string().describe('项目ID'),
    ancestorIds: z.array(z.string()).describe('祖先任务ID列表'),
    parentTaskId: z.string().describe('父任务ID'),
    tfsId: z.string().describe('任务状态ID'),
    tasklistId: z.string().describe('任务分组ID'),
    stageId: z.string().describe('任务列ID'),
    tagIds: z.array(z.string()).describe('标签ID集合'),
    creatorId: z.string().describe('创建人ID'),
    executorId: z.string().describe('执行人ID'),
    involveMembers: z.array(z.string()).describe('参与者ID集合'),
    priority: z.number().int().describe('任务优先级'),
    recurrence: z.array(z.string()).describe('重复规则'),
    isDone: z.boolean().describe('是否任务已完成'),
    isArchived: z.boolean().describe('是否任务放入回收站'),
    visible: z.string().describe('任务隐私性，\'involves\'表达仅参与者可见; \'members\'表达项目成员可见'),
    uniqueId: z.string().describe('任务数字ID'),
    startDate: z.string().describe('任务开始时间(UTC)'),
    dueDate: z.string().describe('任务截止时间(UTC)'),
    accomplishTime: z.string().describe('任务完成时间(UTC)'),
    created: z.string().describe('创建时间(UTC)'),
    updated: z.string().describe('更新时间(UTC)'),
    sfcId: z.string().describe('任务类型ID'),
    customfields: z.array(z.object({
      cfId: z.string().describe('自定义字段ID'),
      type: z.string().describe('自定义字段类型'),
      value: z.array(z.object({
        id: z.string().describe('字段值ID'),
        title: z.string().describe('字段值内容'),
        metaString: z.string().describe('字段值元属性')
      })).describe('字段值集合')
    })).describe('自定义字段值集合')
  }).describe('复制后的任务数据'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 删除任务

接口名称：删除任务
请求方式：POST
接口地址：/gateway/v3/task/{taskId}/delete
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({})
```
返回结果：
```ts
z.object({
  result: z.object({}).describe('删除任务响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务截止时间

接口名称：更新任务截止时间
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/dueDate
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  dueDate: z.string().optional().describe('截止时间'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    dueDate: z.string().optional().describe('截止时间'),
    updated: z.string().optional().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务执行者

接口名称：更新任务执行者
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/executor
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者用户ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  executorId: z.string().optional().describe('执行者用户ID'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    executorId: z.string().describe('执行者用户ID'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务执行者响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务参与者

接口名称：更新任务参与者
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/involveMembers
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  involveMembers: z.array(z.string()).optional().describe('更新任务参与者列表'),
  addInvolvers: z.array(z.string()).optional().describe('新增参与者列表'),
  delInvolvers: z.array(z.string()).optional().describe('移除参与者列表'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    involveMembers: z.array(z.string()).describe('参与者列表'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务参与者响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 跨项目移动任务

接口名称：跨项目移动任务
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/move
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  projectId: z.string().describe('项目ID'),
  tfsId: z.string().optional().describe('任务状态ID'),
  sfcId: z.string().optional().describe('任务类型ID'),
  stageId: z.string().optional().describe('任务列表ID'),
  tasklistId: z.string().optional().describe('任务分组ID')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务ID'),
    content: z.string().describe('任务标题'),
    note: z.string().describe('任务备注'),
    projectId: z.string().describe('项目ID'),
    ancestorIds: z.array(z.string()).describe('祖先任务ID列表'),
    parentTaskId: z.string().describe('父任务ID'),
    tfsId: z.string().describe('任务状态ID'),
    tasklistId: z.string().describe('任务分组ID'),
    stageId: z.string().describe('任务列ID'),
    tagIds: z.array(z.string()).describe('标签ID集合'),
    creatorId: z.string().describe('创建人ID'),
    executorId: z.string().describe('执行人ID'),
    involveMembers: z.array(z.string()).describe('参与者ID集合'),
    priority: z.number().int().describe('任务优先级'),
    recurrence: z.array(z.string()).describe('重复规则'),
    isDone: z.boolean().describe('是否任务已完成'),
    isArchived: z.boolean().describe('是否任务放入回收站'),
    visible: z.string().describe('任务隐私性，\'involves\'表达仅参与者可见; \'members\'表达项目成员可见'),
    uniqueId: z.string().describe('任务数字ID'),
    startDate: z.string().describe('任务开始时间(UTC)'),
    dueDate: z.string().describe('任务截止时间(UTC)'),
    accomplishTime: z.string().describe('任务完成时间(UTC)'),
    created: z.string().describe('创建时间(UTC)'),
    updated: z.string().describe('更新时间(UTC)'),
    sfcId: z.string().describe('任务类型ID'),
    customfields: z.array(z.object({
      cfId: z.string().describe('自定义字段ID'),
      type: z.string().describe('自定义字段类型'),
      value: z.array(z.object({
        id: z.string().describe('字段值ID'),
        title: z.string().describe('字段值内容'),
        metaString: z.string().describe('字段值元属性')
      })).describe('字段值集合')
    })).describe('自定义字段值集合')
  }).describe('移动后任务数据'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务备注

接口名称：更新任务备注
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/note
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  note: z.string().optional().describe('任务备注')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    note: z.string().describe('任务备注'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务备注响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务优先级

接口名称：更新任务优先级
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/priority
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  priority: z.number().int().optional().describe('优先级')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    priority: z.number().int().describe('优先级'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务优先级响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 查询任务详情

接口名称：查询任务详情
请求方式：GET
接口地址：/gateway/v3/task/query
请求头：
```ts
z.object({
  'x-operator-id': z.string().optional().describe('查询人ID, 如果存在会检查该成员可见的任务'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
查询参数:
```ts
z.object({
  taskId: z.string().optional().describe('任务ID集合,使用逗号分隔,和parentTaskId冲突(选其一)'),
  shortIds: z.string().optional().describe('任务短ID集合,使用逗号分隔'),
  parentTaskId: z.string().optional().describe('父任务ID,和taskIds冲突(选其一)')
})
```
返回结果：
```ts
z.object({
  result: z.array(z.object({
    id: z.string().describe('任务ID'),
    taskId: z.string().optional().describe('任务ID (已弃用)'),
    content: z.string().describe('任务标题'),
    note: z.string().describe('任务备注'),
    projectId: z.string().describe('项目ID'),
    ancestorIds: z.array(z.string()).describe('祖先任务ID列表'),
    parentTaskId: z.string().describe('父任务ID'),
    tfsId: z.string().describe('任务状态ID'),
    tasklistId: z.string().describe('任务分组ID'),
    stageId: z.string().describe('任务列ID'),
    tagIds: z.array(z.string()).describe('标签ID集合'),
    creatorId: z.string().describe('创建人ID'),
    executorId: z.string().describe('执行人ID'),
    involveMembers: z.array(z.string()).describe('参与者ID集合'),
    priority: z.number().int().describe('任务优先级'),
    storyPoint: z.string().describe('StoryPoint'),
    recurrence: z.array(z.string()).describe('重复规则列表'),
    isDone: z.boolean().describe('是否任务已完成'),
    isArchived: z.boolean().describe('是否任务放入回收站'),
    visible: z.string().describe('任务隐私性，\'involves\'表达仅参与者可见; \'members\'表达项目成员可见'),
    uniqueId: z.string().describe('任务数字ID'),
    startDate: z.string().describe('任务开始时间(UTC)'),
    dueDate: z.string().describe('任务截止时间(UTC)'),
    accomplishTime: z.string().describe('任务完成时间(UTC)'),
    created: z.string().describe('创建时间(UTC)'),
    updated: z.string().describe('更新时间(UTC)'),
    sfcId: z.string().describe('任务类型ID'),
    sprintId: z.string().describe('迭代ID'),
    sourceId: z.string().describe('复制任务时，原任务的ID'),
    progress: z.number().int().describe('任务进度'),
    customfields: z.array(z.object({
      cfId: z.string().describe('自定义字段ID'),
      type: z.string().describe('自定义字段类型'),
      value: z.array(z.object({
        id: z.string().describe('字段值ID'),
        title: z.string().describe('字段值内容'),
        metaString: z.string().describe('字段值元属性')
      })).describe('字段值集合')
    })).describe('自定义字段值集合')
  })).describe('任务详情集合'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务开始时间

接口名称：更新任务开始时间
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/startDate
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  startDate: z.string().optional().describe('开始时间'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    startDate: z.string().optional().describe('开始时间'),
    updated: z.string().optional().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务标签

接口名称：更新任务标签
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/tag
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  tagIds: z.array(z.string()).optional().describe('替换的标签ID集合'),
  delTagIds: z.array(z.string()).optional().describe('删除的标签ID集合'),
  addTagIds: z.array(z.string()).optional().describe('新增的标签ID集合')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    tagIds: z.array(z.string()).describe('标签ID集合'),
    updated: z.string().optional().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务状态

接口名称：更新任务状态
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/taskflowstatus
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  taskflowstatusId: z.string().optional().describe('任务状态ID'),
  tfsUpdateNote: z.string().optional().describe('任务流转说明')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    taskflowstatusId: z.string().describe('任务状态ID'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务状态响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 查询任务(内测版)

接口名称：(内测版)查询任务
请求方式：GET
接口地址：/gateway/todo/task/query
请求头：
```ts
z.object({
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型'),
  'X-Tenant-Id': z.string().describe('企业 ID')
})
```
入参格式：
查询参数:
```ts
z.object({
  executorId: z.string().describe('执行人id, 必填'),
  page: z.number().int().describe('页数, 默认为1'),
  pageSize: z.number().int().describe('每页数量, 默认为20, 最大不允许超过50')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    totalCount: z.number().int().describe('总数'),
    page: z.number().int().describe('当前页'),
    pageSize: z.number().int().describe('每页数量'),
    data: z.array(z.object({
      taskId: z.string().describe('任务id'),
      subject: z.string().describe('标题'),
      creatorId: z.string().describe('创建人uid'),
      executorId: z.string().describe('执行人uid'),
      planFinishDate: z.string().describe('计划完成时间'),
      planStartDate: z.string().describe('计划开始时间'),
      status: z.number().int().describe('任务状态, 0-未开始，1-进行中，2-已完成'),
      description: z.string().describe('备注'),
      involveMembers: z.array(z.string()).describe('参与者id')
    })).describe('分页结果列表')
  }).describe('结果'),
  errorMessage: z.string().describe('非成功状态时错误信息'),
  code: z.number().describe('响应状态码'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 改变任务的父任务

接口名称：改变任务的父任务
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/parent
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  targetId: z.string().optional().describe('目标任务ID')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务 ID'),
    updated: z.string().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务StoryPoint

接口名称：更新任务StoryPoint
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/storyPoint
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  storyPoint: z.string().optional().describe('StoryPoint'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    storyPoint: z.string().describe('StoryPoint'),
    updated: z.string().optional().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务迭代

接口名称：更新任务迭代
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/sprint
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  sprintId: z.string().optional().describe('任务迭代ID')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务ID'),
    sprintId: z.string().describe('任务SprintId'),
    updated: z.string().describe('更新时间')
  }).describe('更新任务迭代'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 通过TQL搜索任务ID

接口名称：通过TQL搜索自由任务和项目任务ID
请求方式：GET
接口地址：/gateway/all-task/search
请求头：
```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
查询参数:
```ts
z.object({
  tql: z.string().optional().describe('企业下任务搜索TQL语句 参考 TQL查询文档'),
  pageSize: z.number().int().optional().describe('分页长度'),
  pageToken: z.string().optional().describe('分页标')
})
```
返回结果：
```ts
z.object({
  result: z.array(z.string()).describe('任务ID列表'),
  totalSize: z.number().int().describe('任务总数'),
  nextPageToken: z.string().describe('分页标'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务的任务类型

接口名称：更新任务的任务类型
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/sfc/update
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  sfcId: z.string().describe('目标任务类型ID，更新类型时会同时改变状态到目标任务类型绑定的工作流状态'),
  tfsId: z.string().optional().describe('指定目标工作流状态ID（可选）')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务ID'),
    scenariofieldconfigId: z.string().describe('任务类型ID'),
    taskflowstatusId: z.string().describe('任务状态ID'),
    updated: z.string().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 任务富文本内容渲染为HTML

接口名称：任务富文本内容渲染为 html（仅对白名单的应用开放）
请求方式：GET
接口地址：/gateway/v3/task/rtf/render
请求头：
```ts
z.object({
  'x-operator-id': z.string().optional().describe('查询人ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
查询参数:
```ts
z.object({
  rtfFields: z.string().describe('富文本字段标识，多个标识之间用逗号分割，最多支持 20 个\n- 富文本字段：任务ID:cf:字段ID 如 60471fc306c1e046e63759c4:cf:63d61d1cbde6c83a2ce729d6\n- 富文本备注：任务ID:note 如 60471fc306c1e046e63759c4:note'),
  htmlExpireSeconds: z.number().int().optional().describe('渲染html时内容过期时间，默认为 1800(秒)，最小为 600(秒)，最大为 3600(秒)')
})
```
返回结果：
```ts
z.object({
  result: z.array(z.object({
    taskId: z.string().describe('任务ID'),
    rtfField: z.string().describe('富文本字段标识'),
    html: z.string().describe('任务富文本 Html 格式内容')
  })).describe('任务富文本渲染结果列表'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 查询任务状态列表

接口名称：查询任务所在工作流的任务状态列表
请求方式：GET
接口地址：/gateway/v3/task/{taskId}/flow-tfs
请求头：
```ts
z.object({
  'x-operator-id': z.string().optional().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
返回结果：
```ts
z.object({
  result: z.array(z.object({
    id: z.string().describe('状态ID'),
    name: z.string().describe('状态名称'),
    kind: z.string().describe('状态阶段'),
    pos: z.string().describe('自定义排序'),
    rejectStatusIds: z.array(z.string()).optional(),
    isDeleted: z.boolean().describe('是否删除'),
    isTaskflowstatusruleexector: z.boolean().optional(),
    taskflowId: z.string().describe('工作流ID'),
    creatorId: z.string().describe('创建人ID')
  })),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 创建任务

接口名称：创建任务
请求方式：POST
接口地址：/gateway/v3/task/create
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('任务创建人'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
请求体:
```ts
z.object({
  projectId: z.string().describe('项目id'),
  content: z.string().describe('任务标题'),
  executorId: z.string().optional().describe('执行者id'),
  involveMembers: z.array(z.string()).optional().describe('参与者用户ID列表'),
  stageId: z.string().optional().describe('任务列id'),
  tasklistId: z.string().optional().describe('任务组id'),
  taskflowstatusId: z.string().optional().describe('任务状态id'),
  startDate: z.string().optional().describe('开始日期'),
  dueDate: z.string().optional().describe('截止日期'),
  note: z.string().optional().describe('任务备注'),
  priority: z.number().int().optional().describe('执行优先级'),
  parentTaskId: z.string().optional().describe('父任务id'),
  progress: z.number().int().optional().describe('进度'),
  visible: z.string().optional().describe('任务的可见性规则 involves | members'),
  sprintId: z.string().optional().describe('迭代id'),
  tagIds: z.array(z.string()).optional().describe('标签id列表'),
  storyPoint: z.string().optional(),
  scenariofieldconfigId: z.string().optional().describe('任务类型id'),
  reminders: z.array(z.object({
    labels: z.array(z.string()).optional(),
    receivers: z.array(z.string()).optional(),
    rule: z.string().optional().describe('提醒规则 [custom/具体时间, dueDate/P0D, startDate/-PT5M, circle/DTSTART:20220209T173500Z\nRRULE:FREQ=DAILY;COUNT=30;INTERVAL=1;WKST=MO]，注意：循环提醒 rrule 规则 join(\'\\n\')')
  })).optional(),
  customfields: z.array(z.object({
    cfId: z.string().optional().describe('自定义字段值ID'),
    customfieldName: z.string().optional().describe('自定义字段名字'),
    value: z.array(z.object({
      id: z.string().optional().describe('字段值ID。用于统计, 自动化触发条件作用; 对于成员类型的字段这个值需要填写用户ID, 可以利用通讯录接口响应中的 userId 字段'),
      title: z.string().optional().describe('自定义字段值内容, 用于字段渲染'),
      description: z.string().optional(),
      thumbUrl: z.string().optional(),
      url: z.string().optional(),
      meta: z.string().optional().describe('字段值元信息(json格式) (已弃用)'),
      metaString: z.string().optional().describe('字段值元信息(json格式)；若要添加任务附件到文件字段，则需要在 metaString 中填写 "fileToken":"xxx" ，可调用创建文件上传凭证接口获得')
    })).optional().describe('自定义字段值列表')
  })).optional().describe('自定义字段值列表')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务ID'),
    taskId: z.string().describe('任务ID'),
    content: z.string().describe('任务标题'),
    note: z.string().describe('任务备注'),
    projectId: z.string().describe('项目ID'),
    ancestorIds: z.array(z.string()).describe('祖先任务ID列表'),
    parentTaskId: z.string().describe('父任务ID'),
    tfsId: z.string().describe('任务状态ID'),
    tasklistId: z.string().describe('任务分组ID'),
    stageId: z.string().describe('任务列ID'),
    tagIds: z.array(z.string()).describe('标签ID集合'),
    creatorId: z.string().describe('创建人ID'),
    executorId: z.string().describe('执行人ID'),
    involveMembers: z.array(z.string()).describe('参与者ID集合'),
    priority: z.number().int().describe('任务优先级'),
    recurrence: z.array(z.string()).describe('重复规则'),
    isDone: z.boolean().describe('是否任务已完成'),
    isArchived: z.boolean().describe('是否任务放入回收站'),
    visible: z.string().describe('任务隐私性，\'involves\'表达仅参与者可见; \'members\'表达项目成员可见'),
    uniqueId: z.string().describe('任务数字ID'),
    startDate: z.string().describe('任务开始时间(UTC)'),
    dueDate: z.string().describe('任务截止时间(UTC)'),
    accomplishTime: z.string().describe('任务完成时间(UTC)'),
    created: z.string().describe('创建时间(UTC)'),
    updated: z.string().describe('更新时间(UTC)'),
    sfcId: z.string().describe('任务类型ID'),
    customfields: z.array(z.object({
      cfId: z.string().describe('自定义字段ID'),
      type: z.string().describe('自定义字段类型'),
      value: z.array(z.object({
        id: z.string().describe('字段值ID'),
        title: z.string().describe('字段值内容'),
        metaString: z.string().describe('字段值元属性')
      })).describe('字段值集合')
    })).describe('自定义字段值集合')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务加锁/解锁动作

接口名称：更新任务加锁/解锁动作
请求方式：POST
接口地址：/gateway/v3/task/{taskId}/access-policy/update
请求头：
```ts
z.object({
  'x-operator-id': z.string().optional().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  add: z.array(z.object({
    action: z.string().optional().describe(
      `锁定动作类型，可选值包括：
      - content$update: 更新任务标题
      - executorId$update: 更新执行者
      - startDate$update: 更新开始时间
      - dueDate$update: 更新截止时间
      - effort$update: 更新投入时间
      - note$update: 更新备注
      - priority$update: 更新优先级
      - storyPoint$update: 更新storyPoint
      - progress$update: 更新进展
      - tagIds$update: 更新标签
      - task$archive: 删除任务
      - cf:${string}$update: 更新自定义字段值，其中${string}为自定义字段ID`
    )
  })).optional().describe('需要新增的锁定动作列表（加锁）'),
  del: z.array(z.object({
    action: z.string().optional().describe(
      `锁定动作类型，可选值包括：
      - content$update: 更新任务标题
      - executorId$update: 更新执行者
      - startDate$update: 更新开始时间
      - dueDate$update: 更新截止时间
      - effort$update: 更新投入时间
      - note$update: 更新备注
      - priority$update: 更新优先级
      - storyPoint$update: 更新storyPoint
      - progress$update: 更新进展
      - tagIds$update: 更新标签
      - task$archive: 删除任务
      - cf:${string}$update: 更新自定义字段值，其中${string}为自定义字段ID`
    )
  })).optional().describe('需要删除的锁定动作列表（解锁）')
})
```

返回结果：
```ts
z.object({
  result: z.object({
    message: z.string().optional()
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务可见性

接口名称：更新任务可见性
请求方式：POST
接口地址：/gateway/v3/task/{taskId}/visible/update
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  visible: z.string().optional().describe('任务可见性 involves = 隐私任务 members = 公开任务'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
// HTTP 状态码：200
z.object({
  result: z.object({
    visible: z.string().describe('可见性'),
    updated: z.string().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})

// HTTP 状态码：204
z.object({
  result: z.object({}),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务进度

接口名称：更新任务进度
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/progress
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  progress: z.number().int().optional().describe('进度'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    progress: z.number().int().describe('进度'),
    updated: z.string().optional().describe('更新时间')
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```

## 更新任务列表

接口名称：更新任务列表
请求方式：PUT
接口地址：/gateway/v3/task/{taskId}/stage/update
请求头：
```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，目前只支持 "organization" 类型')
})
```
入参格式：
路径参数:
```ts
z.object({
  taskId: z.string().describe('任务ID')
})
```
请求体:
```ts
z.object({
  stageId: z.string().describe('任务列表ID')
})
```
返回结果：
```ts
z.object({
  result: z.object({
    id: z.string().describe('任务ID'),
    stageId: z.string().describe('任务列ID'),
    updated: z.string().describe('更新时间(UTC)')
  }).describe('返回任务模型'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z.string().describe('请求 ID，请求异常时可提供此 ID，进行问题排查。')
})
```
