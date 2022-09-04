async function f() {
  //   const r = await new Promise((res, rej) => rej("I am rejected"));
  throw "I am rejected";
}

f().then(
  () => {},
  (v) => console.log(v)
);
