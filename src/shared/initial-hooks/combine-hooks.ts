export const combineHooks = (hooks: ((ctx: any) => any)[]) => {
  return (ctx: any) =>
    Promise.all(hooks.map((hook) => hook(ctx))).then((data) => {
      return data.reduce((props, hookResult) => {
        Object.assign(props, hookResult);
      });
    });
};
