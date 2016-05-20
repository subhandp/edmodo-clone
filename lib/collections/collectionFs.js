AttachPostCollection = new FS.Collection("attachPostCollection", {
  stores: [new FS.Store.FileSystem("attachPostCollection", {path: "~/edformatika_attach"})]
});
