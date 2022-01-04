# Kinesis-CSV_transform-Lambda

## 背景
Amazon Kinesis 是广泛使用的流式数据处理服务,其中Amazon Kinesis Data Firehose 可以方便的将流式数据例如日志流,点击流,IoT数据加载并转换到数据湖中.

Amazon Kinesis Data Firehose默认支持以下格式的转换:
- Apache 日志到 JSON 的转换
- Apache 日志到 CSV 的转换
- Syslog 至 JSON 转换
- Syslog 至 CSV 转换

默认并不支持IoT 数据的格式转换,此代码可以帮助处理来自AWS IoT Core的Json 流式数据并将其转换为CSV数据,并可以通过简单修改代码,在转换过程中重新进行数据裁剪和排序.
## 部署方法
1. 方法1:使用Kinesis2CSV.yml文件在Cloudformation一键安装
2. 方法2:在Lambda中自行部署

## 使用说明
1. IoT 中Payload数据和转后的CSV各字段可以不完全对应,可以通过result字段调整
2. 可以通过修改result1中的key字段可以修改最终写入到CSV的内容,支持重新排序和过滤
3. 目前仅支持Flat Jason,暂不支持嵌套JSON格式,格式参考Sampledata.json


