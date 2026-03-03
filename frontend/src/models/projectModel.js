/**
 * 将 API 返回的 projects 原始数据转换为组件可用的格式
 */
export function transformProjects(rawList) {
  if (!rawList) return [];

  return rawList.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image || '',
    tags: p.tags || [],
    category: p.category || 'other',
    github: p.github || null,
    demo: p.demo || null,
    featured: Boolean(p.featured),
  }));
}

/**
 * 从项目列表中提取所有唯一分类
 */
export function extractCategories(projects) {
  const categoryLabels = {
    all: '全部',
    fullstack: '全栈',
    frontend: '前端',
    backend: '后端',
    tools: '工具',
  };

  const cats = new Set(projects.map((p) => p.category));
  const result = [{ value: 'all', label: categoryLabels.all }];

  for (const cat of cats) {
    result.push({
      value: cat,
      label: categoryLabels[cat] || cat,
    });
  }

  return result;
}
