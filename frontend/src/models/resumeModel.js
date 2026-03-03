/**
 * 将 API 返回的 resume 原始数据转换为组件可用的格式
 */
export function transformResume(raw) {
  if (!raw) return null;

  return {
    education: (raw.education || []).map((edu) => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      period: edu.period,
      description: edu.description,
      achievements: edu.achievements || [],
    })),
    experience: (raw.experience || []).map((exp) => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      period: exp.period,
      description: exp.description,
      highlights: exp.highlights || [],
    })),
    skills: (raw.skills || []).map((skill) => ({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    })),
  };
}

/**
 * 按 category 分组技能
 */
export function groupSkillsByCategory(skills) {
  const categoryLabels = {
    frontend: '前端开发',
    backend: '后端开发',
    devops: 'DevOps',
    tools: '工具',
    design: '设计',
  };

  const grouped = {};
  for (const skill of skills) {
    const cat = skill.category;
    if (!grouped[cat]) {
      grouped[cat] = {
        label: categoryLabels[cat] || cat,
        items: [],
      };
    }
    grouped[cat].items.push(skill);
  }

  return Object.values(grouped);
}
