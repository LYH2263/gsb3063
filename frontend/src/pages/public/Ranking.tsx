import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp } from 'lucide-react';

const API_ROOT = (import.meta.env.VITE_API_URL || 'http://localhost:8063/api').replace(/\/api$/, '');

export const Ranking = () => {
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res: any = await api.get('/works/ranking');
                setWorks(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, []);

    const getRankBadgeClass = (index: number) => {
        if (index < 3) {
            return 'text-primary font-bold text-2xl';
        }
        return 'text-gray-400 font-semibold text-xl';
    };

    return (
        <div className="py-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                    <TrendingUp className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">热门排行</h1>
                <p className="text-gray-500">本站最受欢迎的 Top 10 作品。</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">加载中...</div>
            ) : works.length === 0 ? (
                <div className="text-center py-20 text-gray-500">暂无排行数据。</div>
            ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                    {works.map((w, index) => (
                        <Link
                            key={w.id}
                            to={`/works/${w.id}`}
                            className="group flex items-center gap-5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
                                <span className={getRankBadgeClass(index)}>
                                    {index + 1}
                                </span>
                            </div>
                            <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                {w.mediaUrl ? (
                                    <img
                                        src={w.mediaUrl.startsWith('http') ? w.mediaUrl : `${API_ROOT}${w.mediaUrl}`}
                                        alt={w.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">暂无图片</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-1 truncate">
                                    {w.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-1">{w.description}</p>
                                <div className="flex items-center gap-1 mt-2 text-sm text-gray-400">
                                    <Eye className="w-4 h-4" />
                                    <span>{w.viewCount} 次浏览</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0 text-gray-300 group-hover:text-primary transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
