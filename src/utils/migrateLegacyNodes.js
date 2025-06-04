export function migrateLegacyNodes(nodes) {
  return nodes.map((n) => {
    const migrated = { ...n };
    migrated.data = { ...migrated.data };
    if (migrated.displayName && !migrated.data.title) {
      migrated.data.title = migrated.displayName;
    }
    if (!migrated.status && migrated.data.status) {
      migrated.status = migrated.data.status;
    }
    if (migrated.status && !migrated.data.status) {
      migrated.data.status = migrated.status;
    }
    return migrated;
  });
}
