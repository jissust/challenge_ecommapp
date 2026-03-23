export const auditLog = async (conn, {
  event,
  entity,
  entityId,
  message,
}) => {
  await conn.query(
    `
    INSERT INTO audit_logs (event_type, entity_type, entity_id, message)
    VALUES (?, ?, ?, ?)
    `,
    [event, entity, entityId, message],
  );
};