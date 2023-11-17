# 这什么也没有

**你访问到了我的知识盲区。。。**

```ts
context.status(404).send(
  '# 这什么也没有\n' +
  '\n' +
  '**你访问到了我的知识盲区。。。**\n' +
  '\n' +
  '```ts\n' +
  await fs.readFile(__filename, { encoding: 'utf8'}) +
  '```\n'
);
```
