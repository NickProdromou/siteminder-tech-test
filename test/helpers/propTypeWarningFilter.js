const propTypeWarningFilter = () => {
  const consoleErrorCopy = console.error;
  sinon
    .stub(console, 'error')
    .callsFake((...args) =>
      args[0].includes('Warning: Failed prop type')
        ? null
        : consoleErrorCopy(args)
    );
};

const restorePropTypeWarnings = () => {
  console.error.restore();
};

export { propTypeWarningFilter, restorePropTypeWarnings };
