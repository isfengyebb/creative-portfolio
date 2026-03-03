/**
 * 将 API 返回的 profile 原始数据转换为组件可用的格式
 */
export function transformProfile(raw) {
  if (!raw) return null;

  return {
    name: raw.name || '',
    title: raw.title || '',
    subtitle: raw.subtitle || '',
    avatar: raw.avatar || '',
    bio: raw.bio || '',
    location: raw.location || '',
    email: raw.email || '',
    social: (raw.social || []).map((item) => ({
      platform: item.platform,
      url: item.url,
      icon: item.icon,
    })),
    highlights: raw.highlights || [],
  };
}
