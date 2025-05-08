 function generateTestEmail(prefix = 'aqa', domain = 'test.com') {
    const timestamp = Date.now(); // унікальність через мілісекунди
    return `${prefix}-${timestamp}@${domain}`;
}

export default generateTestEmail;
