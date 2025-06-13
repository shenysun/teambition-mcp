## 1. 项目放入回收站

接口名称：项目放入回收站
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/archive
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      isArchived: z.boolean().describe('永远为true'),
      updated: z.string().describe('更新时间'),
    })
    .describe('项目放入回收站响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 2. 复制项目

接口名称：复制项目
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/copy
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
  name: z.string().optional().describe('项目名称'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      id: z.string().describe('项目ID'),
      name: z.string().describe('项目名称'),
      creatorId: z.string().describe('创建人ID'),
      logo: z.string().describe('项目封面'),
      organizationId: z.string().describe('企业ID'),
      visibility: z.string().describe('项目可见性'),
      uniqueIdPrefix: z.string().describe('任务ID前缀'),
      created: z.string().describe('创建时间'),
      updated: z.string().describe('更新时间'),
      isArchived: z.boolean().describe('是否在回收站'),
      isSuspended: z.boolean().describe('是否归档'),
      normalType: z.string().describe('项目类型'),
      rootCollectionId: z.string().describe('项目根文件夹ID'),
      sourceId: z.string().describe('来源项目ID'),
      defaultCollectionId: z.string().describe('项目默认文件夹ID'),
      isTemplate: z.boolean().describe('是否为模版项目'),
      customfields: z
        .array(
          z.object({
            customfieldId: z.string().describe('自定义字段ID'),
            type: z.string().describe('自定义字段类型'),
            value: z
              .array(
                z.object({
                  id: z.string().describe('自定义字段值ID'),
                  title: z.string().describe('自定义字段值内容'),
                  metaString: z.string().describe('自定义字段值元属性'),
                })
              )
              .describe('自定义字段值列表'),
          })
        )
        .describe('自定义字段值集合'),
    })
    .describe('项目详情'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 3. 查看项目的项目分组

接口名称：查看项目的项目分组
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/project-tag
请求头：

```ts
z.object({
  'x-operator-id': z.string().optional().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
})
```

返回结果：

```ts
z.object({
  result: z.array(z.string()).describe('项目分组ID列表'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('项目分组结果')
```

## 4. 更新项目的项目分组

接口名称：更新项目的项目分组
请求方式：PUT
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/project-tag
请求头：

```ts
z.object({
  'x-operator-id': z.string().optional().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
  projectTagIds: z.array(z.string()).optional().describe('项目分组ID集合'),
})
```

返回结果：

```ts
z.object({
  result: z.array(z.string()).describe('项目分组ID列表'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('项目分组结果')
```

## 5. 查询项目

接口名称：查询项目
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v3/project/query
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectIds: z.string().optional().describe('项目ID集合，逗号分隔'),
  name: z.string().optional().describe('项目名字(模糊匹配)'),
  pageSize: z.integer().optional().describe('分页大小'),
  pageToken: z.string().optional().describe('分页标'),
  sourceId: z.string().optional().describe('原始项目ID'),
  includeTemplate: z
    .boolean()
    .optional()
    .describe('是否包含模板项目，默认 false'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        id: z.string().describe('项目ID'),
        name: z.string().describe('项目名称'),
        logo: z.string().describe('项目LOGO'),
        description: z.string().describe('项目描述'),
        organizationId: z.string().describe('企业ID'),
        visibility: z.string().describe('可见性，project | organization'),
        isTemplate: z.boolean().describe('是模版项目'),
        creatorId: z.string().describe('创建人ID'),
        isArchived: z.boolean().describe('是否放入回收站'),
        isSuspended: z.boolean().describe('是否归档'),
        uniqueIdPrefix: z.string().describe('任务ID前缀'),
        created: z.string().describe('创建时间'),
        updated: z.string().describe('更新时间'),
        startDate: z.string().describe('项目开始时间'),
        endDate: z.string().describe('项目结束时间'),
        sourceId: z.string().describe('来源项目 ID'),
        customfields: z
          .array(
            z.object({
              customfieldId: z.string().describe('自定义字段ID'),
              type: z.string().describe('自定义字段类型'),
              value: z
                .array(
                  z.object({
                    id: z.string().describe('自定义字段值ID'),
                    title: z.string().describe('自定义字段值内容'),
                    metaString: z.string().describe('自定义字段值元属性'),
                  })
                )
                .describe('自定义字段值列表'),
            })
          )
          .describe('自定义字段值集合'),
      })
    )
    .describe('项目列表'),
  nextPageToken: z.string().describe('分页标'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('查询项目响应')
```

## 6. 恢复归档项目

接口名称：恢复归档项目
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/suspend-restore
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
})
```

返回结果：

```ts
z.object({
  result: z.object({
    isSuspended: z.boolean().describe('永远为false'),
    updated: z.string().describe('更新时间'),
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('恢复归档项目响应')
```

## 7. 归档项目

接口名称：归档项目
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/suspend
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      isSuspended: z.boolean().describe('永远为true'),
      updated: z.string().describe('更新时间'),
    })
    .describe('归档项目响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 8. 更新项目

接口名称：更新项目
请求方式：PUT
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作人ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
  name: z.string().optional().describe('项目名称'),
  description: z.string().optional().describe('项目描述'),
  logo: z.string().optional().describe('项目LOGO的url'),
  visibility: z
    .string()
    .optional()
    .describe('项目可见行，project | organization'),
  startDate: z.string().optional().describe('项目启动时间, 空字符串 代表清空'),
  endDate: z.string().optional().describe('项目结束时间, 空字符串 代表清空'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      updated: z.string().describe('更新时间'),
    })
    .describe('项目更新响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 9. 根据 ID 获取任务类型信息 V2

接口名称：根据 ID 获取任务类型信息 V2
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v2/template/info
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  templateId: z.string().describe('模板 ID'),
})
```

返回结果：

```ts
z.object({
  result: z.object({
    creatorId: z.string().describe('创建人 ID'),
    templateId: z.string().describe('模板 ID'),
    projectId: z.string().describe('项目 ID'),
    taskflowId: z.string().describe('工作流 ID'),
    created: z.string().describe('创建时间'),
    icon: z.string().describe('模板图标'),
    name: z.string().describe('模板名称'),
    type: z.string().describe('模板类型: default,normal,official'),
    updated: z.string().describe('更新时间'),
    customfields: z
      .array(
        z.object({
          id: z.string().describe('模板字段 ID'),
          cfId: z.string().describe('自定义字段 ID'),
          cfOptionsId: z.string().describe('自定义字段选项池 ID'),
          fieldType: z.string().describe('字段类型'),
          placeholder: z.string().describe('字段提示文本'),
          displayed: z.integer().describe('字段是否展示'),
          required: z.integer().describe('字段是否必填'),
        })
      )
      .describe('自定义字段'),
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 10. 获取自定义字段 V2

接口名称：获取自定义字段 V2
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v2/customfield/info
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  cfId: z.string().describe('自定义字段 ID'),
  projectId: z.string().optional().describe('项目 ID'),
})
```

返回结果：

```ts
z.object({
  result: z.object({
    cfId: z.string().describe('字段ID'),
    creatorId: z.string().describe('创建者ID'),
    orgId: z.string().describe('所属企业 ID'),
    boundType: z.string().describe('所属对象（企业或者项目）'),
    boundId: z.string().describe('所属Id（企业或者项目）'),
    name: z.string().describe('字段名称'),
    description: z.string().describe('字段描述'),
    originalId: z.string().describe('来源字段ID'),
    type: z
      .string()
      .describe(
        '类型number/text/date/dropDown/multipleChoice/work/lookup/commongroup/extenalData'
      ),
    created: z.string().describe('创建时间'),
    updated: z.string().describe('更新时间'),
    items: z
      .array(
        z.object({
          itemId: z.string(),
          value: z.string().describe('选项值'),
        })
      )
      .describe('自定义字段值列表'),
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 11. 更新任务字段信息

接口名称：更新任务字段信息
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/task/customfield/update
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
  'X-Operator-Id': z.string().describe('操作人ID'),
})
```

入参格式：

```ts
z.object({
  taskId: z.string().describe('任务ID'),
  customfieldId: z.string().describe('自定义字段ID'),
  disableActivity: z.integer().optional().describe('是否不产生动态'),
  value: z
    .array(
      z.object({
        title: z.string().optional().describe('自定义字段值'),
        description: z.string().optional(),
        thumbUrl: z.string().optional(),
        url: z.string().optional(),
        meta: z.object({}).optional().describe('自定义字段额外信息'),
      })
    )
    .optional(),
})
```

返回结果：

```ts
z.object({
  result: z.object({
    customfields: z
      .array(
        z.object({
          cfId: z.string(),
          value: z
            .array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string(),
                thumbUrl: z.string(),
                url: z.string(),
                meta: z.object({}).describe('自定义字段额外信息'),
              })
            )
            .describe('自定义字段值'),
        })
      )
      .describe('自定义字段值列表'),
    updated: z.string().describe('更新时间'),
  }),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 12. 获取需求分类列表

接口名称：获取需求分类列表
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/story/commongroup
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目 ID'),
  commongroupIds: z.string().optional().describe('需求分类 ID集合，逗号分隔'),
  parentCommongroupId: z.string().optional().describe('父需求分类 ID'),
  pageSize: z.string().optional().describe('每页需求分类数量，默认为 50'),
  pageToken: z.string().optional().describe('分页标'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        id: z.string().describe('ID'),
        name: z.string().describe('名称'),
        projectId: z.string().describe('项目 ID'),
        creatorId: z.string().describe('创建者 ID'),
        ancestorIds: z.array(z.string()).describe('父分类 IDs'),
        isRoot: z.string().describe('是否是根目录'),
        created: z.string().describe('分组创建时间(UTC)'),
        updated: z.string().describe('分组更新时间(UTC)'),
      })
    )
    .describe('需求分类列表'),
  nextPageToken: z.string().describe('分页标'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('返回项目下全部需求分类列表')
```

## 13. 根据项目分组 ID 查询项目

接口名称：根据项目分组 ID 查询项目
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v3/project-tag/{projectTagId}/project/query
请求头：

```ts
z.object({
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectTagId: z.string().describe('项目分组 ID'),
  organizationId: z
    .string()
    .optional()
    .describe(
      '企业ID, 如果提供 x-tenant-id, query中不是必须的, 如果提供必须和 x-tenant-id 一致'
    ),
  pageSize: z.integer().optional().describe('分页大小，默认 1000'),
  pageToken: z.string().optional().describe('分页标'),
  includeSuspended: z
    .boolean()
    .optional()
    .describe('是否包含归档项目，默认 false'),
})
```

返回结果：

```ts
z.object({
  result: z.array(z.string()).describe('项目 ID 列表'),
  nextPageToken: z.string().describe('分页标'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('查询项目响应')
```

## 14. 获取异步 job 执行结果

接口名称：获取异步 job 执行结果
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v3/async-job/list
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  keys: z.string().describe('异步 job 的 readyKey，多个以逗号分隔'),
})
```

返回结果：

```ts
z.object({
  result: z
    .array(
      z.object({
        key: z.string().describe('异步 job 任务 key'),
        isDone: z.boolean().describe('异步 job 任务是否完成'),
        timeCost: z.integer().describe('任务耗时'),
        statusCode: z.integer().describe('响应状态码'),
        response: z
          .string()
          .describe(
            '响应数据，仅当任务完成，isDone 为 true 时存在；格式为字符串化 body 体，需要 JSON 反序列化。'
          ),
      })
    )
    .describe('任务结果列表'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('获取异步 job 执行结果返回')
```

## 15. 异步复制项目

接口名称：异步复制项目
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/{projectId}/copy-async
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectId: z.string().describe('项目ID'),
  name: z.string().describe('项目名称'),
})
```

返回结果：

```ts
z.object({
  result: z
    .object({
      readyKey: z.string().describe('轮询 key'),
    })
    .describe('项目异步复制响应'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
})
```

## 16. 从模版创建项目

接口名称：从模版创建项目
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/create-from-template
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

查询参数：

```ts
z.object({
  organizationId: z
    .string()
    .optional()
    .describe(
      '企业ID, 如果提供 x-tenant-id, query中不是必须的, 如果提供必须和 x-tenant-id 一致'
    ),
})
```

入参格式：

```ts
z.object({
  name: z.string().describe('项目名称'),
  templateId: z.string().describe('模版ID'),
  isTemplate: z.boolean().optional().describe('是否为模版项目，默认为 false'),
}).describe('从模版创建项目请求')
```

返回结果：

```ts
z.object({
  result: z
    .object({
      id: z.string().describe('项目ID'),
      name: z.string().describe('项目名称'),
      creatorId: z.string().describe('创建人ID'),
      logo: z.string().describe('项目封面'),
      organizationId: z.string().describe('企业ID'),
      visibility: z.string().describe('项目可见性'),
      uniqueIdPrefix: z.string().describe('任务ID前缀'),
      created: z.string().describe('创建时间'),
      updated: z.string().describe('更新时间'),
      isArchived: z.boolean().describe('是否在回收站'),
      isSuspended: z.boolean().describe('是否归档'),
      normalType: z.string().describe('项目类型'),
      rootCollectionId: z.string().describe('项目根文件夹ID'),
      sourceId: z.string().describe('来源项目ID'),
      defaultCollectionId: z.string().describe('项目默认文件夹ID'),
      isTemplate: z.boolean().describe('是否为模版项目'),
      customfields: z
        .array(
          z.object({
            customfieldId: z.string().describe('自定义字段ID'),
            type: z.string().describe('自定义字段类型'),
            value: z
              .array(
                z.object({
                  id: z.string().describe('自定义字段值ID'),
                  title: z.string().describe('自定义字段值内容'),
                  metaString: z.string().describe('自定义字段值元属性'),
                })
              )
              .describe('自定义字段值列表'),
          })
        )
        .describe('自定义字段值集合'),
    })
    .describe('项目详情'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('从模版创建项目响应')
```

## 17. 创建项目

接口名称：创建项目
请求方式：POST
接口地址：https://project.zhiyinlou.com/gateway/v3/project/create
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('操作者ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

查询参数：

```ts
z.object({
  organizationId: z
    .string()
    .optional()
    .describe(
      '企业ID, 如果提供 x-tenant-id, query中不是必须的, 如果提供必须和 x-tenant-id 一致'
    ),
})
```

入参格式：

```ts
z.object({
  name: z.string().describe('项目名称'),
}).describe('创建项目请求')
```

返回结果：

```ts
z.object({
  result: z
    .object({
      id: z.string().describe('项目ID'),
      name: z.string().describe('项目名称'),
      creatorId: z.string().describe('创建人ID'),
      logo: z.string().describe('项目封面'),
      organizationId: z.string().describe('企业ID'),
      visibility: z.string().describe('项目可见性'),
      uniqueIdPrefix: z.string().describe('任务ID前缀'),
      created: z.string().describe('创建时间'),
      updated: z.string().describe('更新时间'),
      isArchived: z.boolean().describe('是否在回收站'),
      isSuspended: z.boolean().describe('是否归档'),
      normalType: z.string().describe('项目类型'),
      rootCollectionId: z.string().describe('项目根文件夹ID'),
      sourceId: z.string().describe('来源项目ID'),
      defaultCollectionId: z.string().describe('项目默认文件夹ID'),
      isTemplate: z.boolean().describe('是否为模版项目'),
      customfields: z
        .array(
          z.object({
            customfieldId: z.string().describe('自定义字段ID'),
            type: z.string().describe('自定义字段类型'),
            value: z
              .array(
                z.object({
                  id: z.string().describe('自定义字段值ID'),
                  title: z.string().describe('自定义字段值内容'),
                  metaString: z.string().describe('自定义字段值元属性'),
                })
              )
              .describe('自定义字段值列表'),
          })
        )
        .describe('自定义字段值集合'),
    })
    .describe('项目详情'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('创建项目响应')
```

## 18. 获取用户参与项目

接口名称：获取用户参与项目
请求方式：GET
接口地址：https://project.zhiyinlou.com/gateway/v3/project/user-joined
请求头：

```ts
z.object({
  'x-operator-id': z.string().describe('查询人 ID'),
  'X-Tenant-Id': z.string().describe('企业 ID'),
  'X-Tenant-Type': z
    .string()
    .describe('租户类型，目前只支持 "organization" 类型'),
})
```

入参格式：

```ts
z.object({
  projectIds: z.string().optional().describe('项目ID集合，逗号分隔'),
  projectRoleLevels: z
    .string()
    .optional()
    .describe(
      '过滤指定的项目角色等级，逗号分割，可以填写 0,1,2 分别表示成员, 管理员, 拥有者'
    ),
  sortBy: z
    .string()
    .optional()
    .describe('排序，可选 updated:desc 或者 pinyin:asc'),
  pageSize: z.integer().optional().describe('分页大小'),
  pageToken: z.string().optional().describe('分页标'),
})
```

返回结果：

```ts
z.object({
  result: z.array(z.string()).describe('项目 ID 列表'),
  nextPageToken: z.string().describe('分页标'),
  code: z.number().describe('响应状态码'),
  errorMessage: z.string().describe('异常错误信息'),
  requestId: z
    .string()
    .describe('请求 ID，请求异常时可提供此 ID，进行问题排查。'),
}).describe('获取用户参与项目')
```
