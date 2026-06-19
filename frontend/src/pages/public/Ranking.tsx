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
            return 'text-primary font-bold text-lg';
        }
        return 'text-gray-500 font-medium';
    };

    return (
        <div className="py-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <TrendingUp className="w-10 h-10 text-primary" />
                    <h1 className="text-4xl font-bold tracking-tight">热门排行</h1>
                </div>
                <p className="text-gray-500">最受欢迎的作品 Top 10，按浏览量排序。</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">加载中...</div>
            ) : works.length === 0 ? (
                <div className="text-center py-20 text-gray-500">暂无排行数据</div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-4">
                    {works.map((w, index) => (
                        <Link
                            key={w.id}
                            to={`/works/${w.id}`}
                            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                <span className={getRankBadgeClass(index)}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                {w.mediaUrl ? (
                                    <img
                                        src={w.mediaUrl.startsWith('http') ? w.mediaUrl : `${API_ROOT}${w.mediaUrl}`}
                                        alt={w.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">无图</div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
                                    {w.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                    {w.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm font-medium">{w.viewCount}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ranking;
