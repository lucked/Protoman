//goal for this is to extract the messages and types without generating the files

const protobuf = require('protobufjs');

function traverseTypes(current, fn) {
  if (current instanceof protobuf.Type) fn(current);
  if (current.nestedArray)
    current.nestedArray.forEach(function(nested) {
      traverseTypes(nested, fn);
    });
}

protobuf.load('./space_server.proto', function(err, root) {
  if (err) throw err;

  traverseTypes(root, function(type) {
    console.log(type.fullName);
  });
  // const message = root.lookupType('.api_proto.User');
  // console.log(message.fields);
});