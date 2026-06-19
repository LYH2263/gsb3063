import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import api from '../../services/api';

const API_ROOT = (import.meta.env.VITE_API_URL || 'http://localhost:8063/api').replace(/\/api$/, '');

export const Ranking = () => {
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res: any = await api.get('/works/ranking');
                setWorks(res.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, []);

    return (
        <div className="py-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight mb-4">热门排行</h1>
                <p className="text-gray-500">浏览量最高的前 10 个作品。</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">加载中...</div>
            ) : works.length === 0 ? (
                <div className="text-center py-20 text-gray-500">暂无作品。</div>
            ) : (
                <ul className="space-y-4 max-w-3xl mx-auto">
                    {works.map((w, idx) => {
                        const rank = idx + 1;
                        const isTopThree = rank <= 3;
                        return (
                            <li key={w.id}>
                                <Link
                                    to={`/works/${w.id}`}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-gray-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    <div
                                        className={`flex-none w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold ${isTopThree
                                            ? 'text-primary border-2 border-primary'
                                            : 'text-gray-500 bg-gray-100 dark:bg-gray-800'
                                            }`}
                                    >
                                        {rank}
                                    </div>
                                    <div className="flex-none w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                        {w.mediaUrl ? (
                                            <img
                                                src={w.mediaUrl.startsWith('http') ? w.mediaUrl : `${API_ROOT}${w.mediaUrl}`}
                                                alt={w.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">暂无图片</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold truncate hover:text-primary transition-colors">
                                            {w.title}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                            <Eye className="w-4 h-4" />
                                            <span>{w.viewCount} 次浏览</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Ranking;
