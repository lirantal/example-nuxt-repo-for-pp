export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === "POST") {
    console.log("processing POST request");
    const body = await readBody(event);
    const { text, meta } = body;

    const base = {
      address: {
        city: "New York",
        state: "NY",
        zip: "10003",
      },
    };

    // as an easy to use reference, the example payload is:
    // '{"__proto__": {"isAdmin": "1"}, "name": "Jane", "age": 25, "address": {"street": "123 Main St", "city": "New York", "zip": 10001}}'
    const userMetaInformation = recursiveJSONMerge(base, JSON.parse(meta));

    // optionally do something with the merged meta information like save in a db
    // or reply back

    return { success: true, message: "Memo created" };
  }

  if (method === "GET") {
    return {
      success: true,
      memos: [
        {
          id: 1,
          text: "foo",
        },
      ],
    };
  }

  return { success: false, message: "Method not allowed" };
});

// insecure recursive merge
function recursiveJSONMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === "object") {
      recursiveJSONMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
