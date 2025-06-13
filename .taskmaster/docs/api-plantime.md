## 获取单个计划工时详情

接口名称：获取单个计划工时详情 (get-single-plantime-detail)
请求方式：GET
接口地址：/gateway/plantime/{plantimeId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

路径参数：

```ts
z.object({
  plantimeId: z.string().describe('计划工时 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      plantimeId: z.string().describe('工时 ID'),
      objectId: z.string().describe('工时关联的数据 ID'),
      orgId: z.string().describe('工时所属企业 ID'),
      userId: z.string().describe('工时执行者 ID'),
      date: z.string().describe('工时所属日期字符串'),
      objectType: z.string().describe('工时关联的数据类型'),
      submitterId: z.string().describe('工时提交者 ID'),
      createdAt: z.string().describe('工时创建时间'),
      plantime: z.number().describe('工时时间(单位:毫秒)'),
      updatedAt: z.string().describe('工时更新时间'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 更新计划工时单条记录

接口名称：更新计划工时单条记录 (update-single-plantime-record)
请求方式：PUT
接口地址：/gateway/plantime/{plantimeId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('租户 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，默认为 organization'),
  'X-Operator-Id': z.string().describe('操作人id'),
})
```

路径参数：

```ts
z.object({
  plantimeId: z.string().describe('计划工时 ID'),
})
```

请求体：

```ts
z.object({
  date: z.string().describe('工时所属日期字符串 如\'2023-03-04\''),
  plantime: z.number().optional().describe('更新计划工时数（毫秒）如 39600000'),
  userId: z.string().describe('工时执行者 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      plantimeId: z.string().describe('工时 ID'),
      objectId: z.string().describe('工时关联的数据 ID'),
      objectType: z.string().describe('工时关联的数据类型'),
      userId: z.string().describe('工时执行者 ID'),
      date: z.string().describe('工时所属日期字符串'),
      submitterId: z.string().describe('工时提交者 ID'),
      plantime: z.number().describe('工时时间(单位:毫秒)'),
      createdAt: z.string().describe('工时创建时间'),
      updatedAt: z.string().describe('工时更新时间'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 删除计划工时单条记录

接口名称：删除计划工时单条记录 (delete-single-plantime-record)
请求方式：DEL
接口地址：/gateway/plantime/{plantimeId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('租户 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，默认为 organization'),
  'X-Operator-Id': z.string().describe('操作人id'),
})
```

路径参数：

```ts
z.object({
  plantimeId: z.string().describe('计划工时 ID'),
})
```

请求体：

```ts
z.object({
  ignoreActivity: z.boolean().optional().describe('是否关闭任务动态'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      plantimeId: z.string().describe('工时 ID'),
      objectId: z.string().describe('工时关联的数据 ID'),
      objectType: z.string().describe('工时关联的数据类型'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取单个任务的计划工时列表

接口名称：获取单个任务的计划工时列表 (get-task-plantime-list)
请求方式：GET
接口地址：/gateway/plantime/list/task/{taskId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

路径参数：

```ts
z.object({
  taskId: z.string().describe('任务 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        plantimeId: z.string().describe('工时 ID'),
        objectId: z.string().describe('工时关联的数据 ID'),
        orgId: z.string().describe('工时所属企业 ID'),
        userId: z.string().describe('工时执行者 ID'),
        date: z.string().describe('工时所属日期字符串'),
        objectType: z.string().describe('工时关联的数据类型'),
        submitterId: z.string().describe('工时提交者 ID'),
        createdAt: z.string().describe('工时创建时间'),
        plantime: z.number().describe('工时时间(单位:毫秒)'),
        updatedAt: z.string().describe('工时更新时间'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取单个任务的计划工时总和

接口名称：获取单个任务的计划工时总和 (get-task-plantime-aggregation)
请求方式：GET
接口地址：/gateway/plantime/aggregation/task/{taskId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

路径参数：

```ts
z.object({
  taskId: z.string().describe('任务 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        objectId: z.string().describe('工时关联的数据 ID'),
        objectType: z.string().describe('工时关联的数据类型'),
        plantime: z.number().describe('总计工时时间(单位:毫秒)'),
        count: z.number().describe('计划工时记录数量'),
        objects: z
          .array(
            z.object({
              plantimeId: z.string().describe('工时 ID'),
              objectType: z.string().describe('工时关联的数据类型'),
              objectId: z.string().describe('工时关联的数据 ID'),
              plantime: z.number().describe('工时时间(单位:毫秒)'),
              submitterId: z.string().describe('工时提交者 ID'),
            })
          )
          .optional(),
        submitterIds: z
          .array(z.string())
          .optional()
          .describe('工时提交者 ID 列表'),
        objectIds: z
          .array(z.string())
          .optional()
          .describe('工时关联的数据 ID 列表'),
        userIds: z.array(z.string()).optional().describe('工时执行者 ID 列表'),
        dates: z
          .array(z.string())
          .optional()
          .describe('工时所属日期字符串列表'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取一定时间内订阅的指定用户的计划工时聚合数

接口名称：获取一定时间内订阅的指定用户的计划工时聚合数 (get-user-plantime-aggregation-by-date-range)
请求方式：POST
接口地址：/gateway/plantime/aggregation/datesUsers
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

请求体：

```ts
z.object({
  userIds: z.array(z.string()).describe('用户 ID 列表'),
  subscriberId: z.string().describe('订阅者 ID'),
  startDate: z.string().describe('开始日期'),
  endDate: z.string().describe('结束日期'),
  filter: z
    .object({
      task: z
        .object({
          isDone: z
            .number()
            .optional()
            .describe('是否已完成 (0: 未完成, 1: 已完成)'),
          isArchived: z
            .number()
            .optional()
            .describe('是否是回收站任务 (0: 否, 1: 是)'),
          priority: z.array(z.number()).optional().describe('优先级'),
          updated: z.string().optional().describe('更新时间'),
          dueDate: z.string().optional().describe('截止时间'),
          startDate: z.string().optional().describe('开始时间'),
          projectId: z.string().optional().describe('限定任务的所属项目的id'),
          creatorId: z.array(z.string()).optional().describe('任务创建者id'),
          executorId: z.array(z.string()).optional().describe('任务执行者id'),
          involveMembers: z
            .array(z.string())
            .optional()
            .describe('任务参与者id'),
          scenarioId: z.array(z.string()).optional().describe('任务类型id'),
          stageId: z.array(z.string()).optional().describe('任务列表id'),
          taskflowstatusId: z
            .array(z.string())
            .optional()
            .describe('工作流状态id'),
        })
        .optional(),
      project: z
        .object({
          projectId: z.array(z.string()).optional().describe('项目 ID 列表'),
          isArchived: z
            .number()
            .optional()
            .describe('是否是回收项目 (0: 否, 1: 是)'),
          isSuspended: z
            .number()
            .optional()
            .describe('是否是归档项目 (0: 否, 1: 是)'),
        })
        .optional(),
    })
    .optional(),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        userId: z.string().describe('用户id'),
        date: z.string().describe('工时所属日期字符串'),
        plantime: z.number().describe('总计工时时间(单位:毫秒)'),
        count: z.number().describe('计划工时记录数量'),
        objects: z
          .array(
            z.object({
              plantimeId: z.string().describe('工时 ID'),
              objectType: z.string().describe('工时关联的数据类型'),
              objectId: z.string().describe('工时关联的数据 ID'),
              plantime: z.number().describe('工时时间(单位:毫秒)'),
              submitterId: z.string().describe('工时提交者 ID'),
            })
          )
          .optional(),
        objectIds: z
          .array(z.string())
          .optional()
          .describe('工时关联的数据 ID 列表'),
        submitterIds: z
          .array(z.string())
          .optional()
          .describe('工时提交者 ID 列表'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 创建实际工时

接口名称：创建实际工时 (create-actual-worktime)
请求方式：POST
接口地址：/gateway/worktime/create
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

请求体：

```ts
z.object({
  userId: z.string().describe('用户 ID'),
  submitterId: z.string().describe('工时执行人'),
  objectId: z.string().describe('任务 ID'),
  objectType: z.string().describe('入参: task'),
  includesHolidays: z
    .number()
    .describe(
      '是否包含节假日, 传 1 表示周六日也填工时，否则填0系统会跳过周六日顺延周一开始填工时'
    ),
  isDuration: z.number().describe('如果开始截止时间跨天了，填1，否则填0'),
  worktime: z.number().describe('实际工时数'),
  startDate: z.string().describe('开始时间'),
  endDate: z.string().describe('结束时间'),
  description: z.string().describe('工作进展'),
  ignoreActivity: z.boolean().optional().describe('是否关闭任务动态'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        worktimeId: z.string().describe('工时 ID'),
        objectType: z.string().describe('工时关联的数据类型'),
        objectId: z.string().describe('工时关联的数据 ID'),
        worktime: z.number().describe('工时时间(单位:毫秒)'),
        userId: z.string().describe('工时执行者 ID'),
        date: z.string().describe('工时所属日期字符串'),
        description: z.string().describe('工作进展描述'),
        orgId: z.string().describe('工时所属企业 ID'),
        submitterId: z.string().describe('工时提交者 ID'),
        createdAt: z.string().describe('工时创建时间'),
        updatedAt: z.string().describe('工时更新时间'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取单个实际工时详情

接口名称：获取单个实际工时详情 (get-single-actual-worktime-detail)
请求方式：GET
接口地址：/gateway/worktime/{worktimeId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

路径参数：

```ts
z.object({
  worktimeId: z.string().describe('实际工时 ID'),
})
```

返回结果：

```ts
z.object({
  ok: z.number().optional().describe('是否执行成功'),
  message: z.string().optional().describe('执行信息'),
  result: z
    .object({
      worktimeId: z.string().describe('工时 ID'),
      objectType: z.string().describe('工时关联的数据类型'),
      objectId: z.string().describe('工时关联的数据 ID'),
      worktime: z.number().describe('工时时间(单位:毫秒)'),
      userId: z.string().describe('工时执行者 ID'),
      date: z.string().describe('工时所属日期字符串'),
      description: z.string().describe('工作进展描述'),
      orgId: z.string().describe('工时所属企业 ID'),
      submitterId: z.string().describe('工时提交者 ID'),
      createdAt: z.string().describe('工时创建时间'),
      updatedAt: z.string().describe('工时更新时间'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 更新实际工时单条记录

接口名称：更新实际工时单条记录 (update-single-actual-worktime-record)
请求方式：PUT
接口地址：/gateway/worktime/{worktimeId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('租户 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，默认为 organization'),
  'X-Operator-Id': z.string().describe('操作人id'),
})
```

路径参数：

```ts
z.object({
  worktimeId: z.string().describe('实际工时 ID'),
})
```

请求体：

```ts
z.object({
  date: z.string().describe('工时所属日期字符串 如\'2023-03-04\''),
  worktime: z.number().optional().describe('更新实际工时数（毫秒）如 39600000'),
  description: z.string().optional().describe('工作进展'),
  userId: z.string().describe('工时执行者 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      worktimeId: z.string().describe('工时 ID'),
      objectId: z.string().describe('工时关联的数据 ID'),
      objectType: z.string().describe('工时关联的数据类型'),
      userId: z.string().describe('工时执行者 ID'),
      date: z.string().describe('工时所属日期字符串'),
      submitterId: z.string().describe('工时提交者 ID'),
      description: z.string().optional().describe('工时描述'),
      worktime: z.number().describe('工时时间(单位:毫秒)'),
      createdAt: z.string().describe('工时创建时间'),
      updatedAt: z.string().describe('工时更新时间'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 删除实际工时单条记录

接口名称：删除实际工时单条记录 (delete-single-actual-worktime-record)
请求方式：DEL
接口地址：/gateway/worktime/{worktimeId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('租户 ID'),
  'X-Tenant-Type': z.string().describe('租户类型，默认为 organization'),
  'X-Operator-Id': z.string().describe('操作人id'),
})
```

路径参数：

```ts
z.object({
  worktimeId: z.string().describe('实际工时 ID'),
})
```

请求体：

```ts
z.object({
  ignoreActivity: z.boolean().optional().describe('是否关闭任务动态'),
})
```

返回结果：

```ts
z.object({
  result: z.object({}).optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取单个任务的实际工时列表

接口名称：获取单个任务的实际工时列表 (get-task-actual-worktime-list)
请求方式：GET
接口地址：/gateway/worktime/list/task/{taskId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

路径参数：

```ts
z.object({
  taskId: z.string().describe('任务 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        worktimeId: z.string().describe('工时 ID'),
        objectType: z.string().describe('工时关联的数据类型'),
        objectId: z.string().describe('工时关联的数据 ID'),
        worktime: z.number().describe('工时时间(单位:毫秒)'),
        userId: z.string().describe('工时执行者 ID'),
        date: z.string().describe('工时所属日期字符串'),
        description: z.string().describe('工作进展描述'),
        orgId: z.string().describe('工时所属企业 ID'),
        submitterId: z.string().describe('工时提交者 ID'),
        createdAt: z.string().describe('工时创建时间'),
        updatedAt: z.string().describe('工时更新时间'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取单个任务的实际工时总和

接口名称：获取单个任务的实际工时总和 (get-task-actual-worktime-aggregation)
请求方式：GET
接口地址：/gateway/worktime/aggregation/task/{taskId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

路径参数：

```ts
z.object({
  taskId: z.string().describe('任务 ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        objectId: z.string().describe('工时关联的数据 ID'),
        objectType: z.string().describe('工时关联的数据类型'),
        worktime: z.number().describe('总计工时时间(单位:毫秒)'),
        count: z.number().describe('实际工时记录数量'),
        objects: z
          .array(
            z.object({
              worktimeId: z.string().describe('工时 ID'),
              objectType: z.string().describe('工时关联的数据类型'),
              objectId: z.string().describe('工时关联的数据 ID'),
              worktime: z.number().describe('工时时间(单位:毫秒)'),
              submitterId: z.string().describe('工时提交者 ID'),
            })
          )
          .optional()
          .describe('工时记录信息'),
        objectIds: z
          .array(z.string())
          .optional()
          .describe('工时关联的数据 ID 列表'),
        submitterIds: z
          .array(z.string())
          .optional()
          .describe('工时提交者 ID 列表'),
        userIds: z.array(z.string()).optional().describe('工时执行者 ID 列表'),
        dates: z
          .array(z.string())
          .optional()
          .describe('工时所属日期字符串列表'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取一定时间内订阅的指定用户的实际工时聚合数据

接口名称：获取一定时间内订阅的指定用户的实际工时聚合数据 (get-user-actual-worktime-aggregation-by-date-range)
请求方式：POST
接口地址：/gateway/worktime/aggregation/datesUsers
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

请求体：

```ts
z.object({
  userIds: z.array(z.string()).describe('用户 ID 列表'),
  subscriberId: z.string().describe('订阅者 ID'),
  startDate: z.string().describe('开始日期'),
  endDate: z.string().describe('结束日期'),
  filter: z
    .object({
      task: z
        .object({
          isDone: z
            .number()
            .optional()
            .describe('是否已完成 (0: 未完成, 1: 已完成)'),
          isArchived: z
            .number()
            .optional()
            .describe('是否是回收站任务 (0: 否, 1: 是)'),
          priority: z.array(z.number()).optional().describe('优先级'),
          updated: z.string().optional().describe('更新时间'),
          dueDate: z.string().optional().describe('截止时间'),
          startDate: z.string().optional().describe('开始时间'),
          projectId: z.string().optional().describe('限定任务的所属项目的id'),
          creatorId: z.array(z.string()).optional().describe('任务创建者id'),
          executorId: z.array(z.string()).optional().describe('任务执行者id'),
          involveMembers: z
            .array(z.string())
            .optional()
            .describe('任务参与者id'),
          scenarioId: z.array(z.string()).optional().describe('任务类型id'),
          stageId: z.array(z.string()).optional().describe('任务列表id'),
          taskflowstatusId: z
            .array(z.string())
            .optional()
            .describe('工作流状态id'),
        })
        .optional(),
      project: z
        .object({
          projectId: z.array(z.string()).optional().describe('项目 ID 列表'),
          isArchived: z
            .number()
            .optional()
            .describe('是否是回收项目 (0: 否, 1: 是)'),
          isSuspended: z
            .number()
            .optional()
            .describe('是否是归档项目 (0: 否, 1: 是)'),
        })
        .optional(),
    })
    .optional(),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        userId: z.string().describe('用户id'),
        date: z.string().describe('工时所属日期字符串'),
        worktime: z.number().describe('总计工时时间(单位:毫秒)'),
        count: z.number().describe('实际工时记录数量'),
        objects: z
          .array(
            z.object({
              worktimeId: z.string().describe('工时 ID'),
              objectType: z.string().describe('工时关联的数据类型'),
              objectId: z.string().describe('工时关联的数据 ID'),
              worktime: z.number().describe('工时时间(单位:毫秒)'),
              submitterId: z.string().describe('工时提交者 ID'),
            })
          )
          .optional()
          .describe('工时记录信息'),
        objectIds: z
          .array(z.string())
          .optional()
          .describe('工时关联的数据 ID 列表'),
        submitterIds: z
          .array(z.string())
          .optional()
          .describe('工时提交者 ID 列表'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取用户所有计划工时详情数据

接口名称：获取用户所有计划工时详情数据 (get-user-all-plantime-details)
请求方式：GET
接口地址：/gateway/plantime/query
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

查询参数：

```ts
z.object({
  userId: z.string().describe('用户idID集合,使用逗号分隔，最大数据100'),
  pageToken: z
    .string()
    .describe(
      '分页标记，第一次请求不填或者空字符串，表示从头开始遍历；分页查询结果还有更多项时返回 nextPageToken，下次遍历可采用该 nextPageToken 入参 pageToken 获取查询结果，示例值："cfcb90voe9jct71bqkfg"'
    ),
  pageSize: z.string().describe('分页大小, 示例值：10'),
  startDate: z.string().describe('查询起始时间，格式 “2022-08-01”'),
  endDate: z
    .string()
    .describe('查询结束时间，格式 “2022-08-01”，与起始时间间隔90天内'),
})
```

返回结果：

```ts
z.object({
  message: z.string().optional().describe('执行结果描述'),
  result: z
    .array(
      z.object({
        plantimeId: z.string().describe('工时 ID'),
        objectType: z.string().describe('工时关联类型,默认task'),
        objectId: z.string().describe('工时关联的task ID'),
        plantime: z.number().describe('工时时间(单位:毫秒)'),
        userId: z.string().describe('工时执行者 ID'),
        date: z.string().describe('工时所属日期字符串'),
        orgId: z.string().describe('工时所属企业 ID'),
        submitterId: z.string().describe('工时提交者 ID'),
        createdAt: z.string().describe('工时创建时间'),
        updatedAt: z.string().describe('工时更新时间'),
      })
    )
    .optional(),
  nextPageToken: z
    .string()
    .optional()
    .describe(
      '分页标记，当返回为非空字符串时表示还有更多数据，可以将此字符串赋值到请求参数 pageToken 获取更多数据。示例值："cfcbh8noe9jct71bqkg0"'
    ),
  count: z.number().optional().describe('本次请求条件下的数据总量'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 获取用户所有实际工时详情数据

接口名称：获取用户所有实际工时详情数据 (get-user-all-actual-worktime-details)
请求方式：GET
接口地址：/gateway/worktime/query
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

查询参数：

```ts
z.object({
  userId: z.string().describe('用户idID集合,使用逗号分隔，最大数据为100'),
  pageToken: z
    .string()
    .describe(
      '分页标记，第一次请求不填或者空字符串，表示从头开始遍历；分页查询结果还有更多项时返回 nextPageToken，下次遍历可采用该 nextPageToken 入参 pageToken 获取查询结果，示例值："cfcb90voe9jct71bqkfg"'
    ),
  pageSize: z.string().describe('分页大小, 示例值：10'),
  startDate: z.string().describe('查询起始时间，格式 “2022-08-01”'),
  endDate: z
    .string()
    .describe('查询结束时间，格式 “2022-08-01”，与起始时间间隔90天内'),
})
```

返回结果：

```ts
z.object({
  message: z.string().optional().describe('执行结果描述'),
  result: z
    .array(
      z.object({
        worktimeId: z.string().describe('工时 ID'),
        objectType: z.string().describe('工时关联类型,默认task'),
        objectId: z.string().describe('工时task ID'),
        worktime: z.number().describe('工时时间(单位:毫秒)'),
        userId: z.string().describe('工时执行者 ID'),
        date: z.string().describe('工时所属日期字符串'),
        orgId: z.string().describe('工时所属企业 ID'),
        submitterId: z.string().describe('工时提交者 ID'),
        createdAt: z.string().describe('工时创建时间'),
        updatedAt: z.string().describe('工时更新时间'),
      })
    )
    .optional(),
  nextPageToken: z
    .string()
    .optional()
    .describe(
      '分页标记，当返回为非空字符串时表示还有更多数据，可以将此字符串赋值到请求参数 pageToken 获取更多数据。示例值："cfcbh8noe9jct71bqkg0"'
    ),
  count: z.number().optional().describe('本次请求条件下的数据总量'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 创建实际工时审批对象

接口名称：创建实际工时审批对象 (create-actual-worktime-approval)
请求方式：POST
接口地址：/gateway/worktime/approve/submit
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
  'X-Operator-Id': z.string().describe('创建者 ID'),
})
```

请求体：

```ts
z.object({
  workTimeIds: z.array(z.string()).describe('实际工时 ID 列表'),
})
```

返回结果：

```ts
z.object({
  message: z.string().optional().describe('执行结果描述'),
  result: z
    .object({
      openId: z.string().describe('openid, tb 侧关联ID, 回写状态时入参'),
      workTimeIds: z.array(z.string()).describe('实际工时 ID 列表'),
      time: z.number().describe('实际工时数(单位:毫秒)'),
      organizationId: z.string().describe('企业ID'),
      taskId: z.string().describe('任务ID'),
      userId: z.string().describe('填报人用户ID'),
      creatorId: z.string().describe('创建人用户ID'),
      status: z
        .string()
        .describe(
          '审批状态，enum: 待审批 NONE、新建 NEW、运行中 RUNNING、已完成-同意 COMPLETED-AGREE、已完成-拒绝 COMPLETED-REFUSE、撤销 TERMINATED'
        ),
      createdAt: z.string().describe('创建时间'),
      updatedAt: z.string().describe('更新时间'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 更新工时审批对象

接口名称：更新工时审批对象 (update-worktime-approval)
请求方式：PUT
接口地址：/gateway/worktime/approve/{openId}
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
  'X-Operator-Id': z.string().describe('操作人 ID'),
})
```

路径参数：

```ts
z.object({
  openId: z.string().describe('审批对象ID'),
})
```

请求体：

```ts
z.object({
  status: z
    .string()
    .optional()
    .describe(
      '审批状态，enum: 待审批 NONE、新建 NEW、运行中 RUNNING、已完成-同意 COMPLETED-AGREE、已完成-拒绝 COMPLETED-REFUSE、撤销 TERMINATED'
    ),
  instanceId: z.string().optional().describe('三方审批单实例ID，非必填'),
  url: z.string().optional().describe('审批单链接'),
  title: z.string().optional().describe('审批单title， 我的审批列表展示用'),
  submitTime: z
    .string()
    .optional()
    .describe(
      '审批单提交时间， 我的审批列表展示用，例：2023-04-10T07:50:17.947Z'
    ),
  finishTime: z
    .string()
    .optional()
    .describe(
      '审批单完成时间， 我的审批列表展示用，例：2023-04-10T07:50:17.947Z'
    ),
})
```

返回结果：

```ts
z.object({
  message: z.string().optional().describe('执行结果描述'),
  result: z
    .object({
      openId: z.string().describe('openid, tb 侧关联ID, 回写状态时入参'),
      workTimeIds: z.array(z.string()).describe('实际工时 ID 列表'),
      time: z.number().describe('实际工时数(单位:毫秒)'),
      organizationId: z.string().describe('企业ID'),
      taskId: z.string().describe('任务ID'),
      userId: z.string().describe('填报人用户ID'),
      creatorId: z.string().describe('创建人用户ID'),
      status: z
        .string()
        .describe(
          '审批状态，enum: 待审批 NONE、新建 NEW、运行中 RUNNING、已完成-同意 COMPLETED-AGREE、已完成-拒绝 COMPLETED-REFUSE、撤销 TERMINATED'
        ),
      createdAt: z.string().describe('创建时间'),
      updatedAt: z.string().describe('更新时间'),
      url: z.string().optional().describe('审批单链接'),
      title: z.string().optional().describe('审批单title'),
      submitTime: z.string().optional().describe('审批单提交时间'),
      finishTime: z.string().optional().describe('审批单完成时间'),
      instanceId: z.string().optional().describe('三方审批单实例ID'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 更新工时企业人天的最大填报时间限制

接口名称：更新工时企业人天的最大填报时间限制 (update-worktime-restriction)
请求方式：PUT
接口地址：/gateway/worktime/restriction
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
  'X-Operator-Id': z.string().describe('操作人 ID'),
})
```

请求体：

```ts
z.object({
  userId: z
    .string()
    .optional()
    .describe('限制填报的用户ID(需要与 date 一起传来限制人天的填报)'),
  date: z.string().optional().describe('限制填报的日期（格式：YYYY-MM-DD）'),
  maxTime: z.string().describe('限制填报的最大时间（单位：ms）'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      message: z.string().optional().describe('执行结果描述'),
      ok: z.boolean().optional().describe('是否成功'),
    })
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 创建计划工时

接口名称：创建计划工时 (create-plantime)
请求方式：POST
接口地址：/gateway/plantime/create
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

请求体：

```ts
z.object({
  userId: z.string().describe('用户 ID'),
  submitterId: z.string().describe('工时提交者 ID'),
  objectId: z.string().describe('任务 ID'),
  objectType: z.string().describe('入参: task'),
  includesHolidays: z
    .number()
    .describe(
      '是否包含节假日, 传 1 表示周六日也填工时，否则填0系统会跳过周六日顺延周一开始填工时'
    ),
  isDuration: z.number().describe('如果开始截止时间跨天了，填1，否则填0'),
  plantime: z.number().describe('计划工时数'),
  startDate: z.string().describe('开始时间'),
  endDate: z.string().describe('结束时间'),
  ignoreActivity: z.boolean().optional().describe('是否关闭任务动态'),
})
```

返回结果：

```ts
z.object({
  message: z.string().optional().describe('执行结果描述'),
  result: z
    .array(
      z.object({
        plantimeId: z.string().describe('工时 ID'),
        objectId: z.string().describe('工时关联的数据 ID'),
        orgId: z.string().describe('工时所属企业 ID'),
        userId: z.string().describe('工时执行者 ID'),
        date: z.string().describe('工时所属日期字符串'),
        objectType: z.string().describe('工时关联的数据类型'),
        submitterId: z.string().describe('工时提交者 ID'),
        createdAt: z.string().describe('工时创建时间'),
        plantime: z.number().describe('工时时间(单位:毫秒)'),
        updatedAt: z.string().describe('工时更新时间'),
      })
    )
    .optional(),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().optional().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```
