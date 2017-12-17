dojo.provide("unieap.nls.application_ja_JP");
RIA_I18N={
	
		//-----------------------向导控件-----------------------------//
		wizard:{
			back: "戻る",
			next: "次",
			done: "終了",
			cancel: "キャンセル"
		},
	
		//-----------------------表单控件-----------------------------//
		form:{
			calendar:{
				//周日
				full_Sunday :"日曜日",
				//周一
				full_Monday :"月曜日",
				//周二
				full_Tuesday:"火曜日",
				//周三
				full_Wednesday:"水曜日",
				//周四
				full_Thursday:"木曜日",
				//周五
				full_Firday:"金曜日",
				//周六
				full_Saturday:"土曜日",
				//日
				short_Sunday:"日",
				//一
				short_Monday:"月",
				//二
				short_Tuesday:"火",
				//三
				short_Wednesday:"水",
				//四
				short_Thursday:"木",
				//五
				short_Firday:"金",
				//六
				short_Saturday:"土",
				//一月
				full_January:"一月",
				//二月
				full_February:"二月",
				//三月
				full_March:"三月",
				//四月
				full_April:"四月",
				//五月
				full_May:"五月",
				//六月
				full_June:"六月",
				//七月
				full_July:"七月",
				//八月
				full_August:"八月",
				//九月
				full_September:"九月",
				//十月
				full_October:"十月",
				//十一月
				full_November:"十一月",
				//十二月
				full_December:"十二月",
				//一月
				short_January:"一月",
				//二月
				short_February:"二月",
				//三月
				short_March:"三月",
				//四月
				short_April:"四月",
				//五月
				short_May:"五月",
				//六月
				short_June:"六月",
				//七月
				short_July:"七月",
				//八月
				short_August:"八月",
				//九月
				short_September:"九月",
				//十月
				short_October:"十月",
				//十一月
				short_November:"十一月",
				//十二月
				short_December:"十二月",
				//关于
				about :"について",
				// 上一年
				prev_year :" 前年",
				// 上个月
				prev_month:" 先月",
				//到今天
				go_today :"今日まで",
				//下个月
				next_month:"来月",
				//下一年
				next_year:"来年",
				//选择日期
				sel_date:"日付を選択",
				//拖动
				drag_to_move:"ドラッグ",
				//(今天)
				part_today :"(今日)",
				//%s为这周的第一天
				day_first:"%sが当週の1日目",
				//关闭
				close:"閉じる",
				//今天
				today:"今日",
				//(按着Shift键)单击或拖动改变值
				time_part:"(Shiftキーを押しながら)クリックまたはドラッグして値を変更する。",
				//%Y-%m-%d
				def_date_format:"%Y-%m-%d",
				//%A %b %e日
				tt_date_format:"%A %b %e日",
				//周
				wk:"週",
				//时间:
				time:"時間:"
			},

			combobox:{
				//位于comboboxpopup文件中
				//代码值
				codeValue:"コード値",
				//代码标题
				codeName:"コード名"
			},
			fileinput:{
				//浏览,
				browser:"閲覧,",
				//取消,
				cancel:"キャンセル,",
				//只允许上传文件后缀名为,
				fileInvalidFormer:"拡張子が",
				//的文件,
				fileInvalidLatter:"のファイルしかアップロードできません。",
				//'提示信息'
				info:"メッセージ'"
			},

			form:{
				//校验提示
				validateMsg:"チェックメッセージ"
			},

			formWidgetValidator:{
				//输入不合法!
				errorMsg:"入力内容が不正です。",
				//该输入项的值不能为空！
				nullError:"この項目は必須入力です。",
				//该输入项的最大长度为
				maxLengthError:"この項目の入力できる最大文字数は",
				//该输入项的最小长度为
				minLengthError:"この項目の入力できる最小文字数は"
			},
			
			mobilePhoneValidator:{
				//手机号码输入不合法!
				errorMsg:"無効の携帯電話の番号"
			},
			
			telephoneValidator:{
				//电话号码输入不合法!
				errorMsg:"無効の電話番号"
			},
			
			idCardValidator:{
				//身份证号不合法!
				errorMsg:"無効の住民登録番号"
			},
			
			emailValidator:{
				//Email不合法!
				errorMsg:"無効の電子メール"
			},
			
			carPlateValidator:{
				//车牌号不合法!
				errorMsg:"無効のナンバープレート"
			},
			
			dateTextBox:{
				//位于文件unieap.form.DateDisplayFormatter中，用于指定日期的默认格式
				//yyyy-MM-dd
				dataFormat:"yyyy-MM-dd"
			},
			
			numberTextBox:{
				//位于unieap.form.NumberTextBoxValidator中，用于提示只能输入数字
				//该输入项只能输入数字！
				errorMsg:"この項目に数字しか入力できません。"
			}

		},
		
		//-----------------------数据表格控件-----------------------------//
		
		grid:{
			'export':{
				//导出设置
				exportSetting:"エクスポート設置",
				//服务端导出
				serverExport:"サーバでエクスポート",
				//客户端导出
				clientExport:"クライアントでエクスポート",
				//导出选中记录
				selectedExport:"選択したレコードをエクスポート",
                                //提示信息
				info:"メッセージ",
				//无可导出数据，请重新设置查询条件后再导出!
				noDataByQuery :"出力するデータがありません。検索条件をもう一度設定して出力してください。",
				//无可导出数据，请先选择数据再导出!い。
				noDataByChoices:"出力するデータがありません。データを選択してから出力してください。"
			},
			
			'import':{
                //提示信息
				info:"メッセージ",
				//导入成功
				importSuccess:"導入に成功",
				//唯一性校验配置错误！错误字段:
				uniqueMessage:"唯一性検査配置エラー。エラーフィールド: ",
				//导入设置
				importSetting:"設定をインポート",
				//获取信息失败
				getInfoError:"情報の取得に失敗しました",
				//后台自定义校验中断校验，请联系管理员！
				backInterrupt:"楽屋カスタム検査中断検査。管理者に連絡してください。",
				//前台自定义校验中断校验！请联系管理员！
				proscInterrupt:"フロントカスタム検査中断検査。管理者に連絡してください。",
				//数据
				infoData:"データ"
			},
			
			individual:{
				//设置
				settings:"設定",
				//重置
				reset:"リセット",
				//个性化设置
				title:"カスタマイズ設定",
				//显示
				visible:"表示",
				//锁定
				lock:"ロック",
				//列名
				column:"カラム名",
				//上移
				moveup:"上に移動",
				//下移
				movedown:"下に移動",
				//保存
				save:"保存",
				//应用
				apply:"アプリ"
			},
			
			paging:{
				//本页共{0}条记录  共{1}条记录
				template:"このページに{0}件を表示  合計{1}件",
				//第
				pagePrefix:"第",
				//页
				page:"ページ",
				//保存修改?
				saveModified:"保存を修正しますか。",
				//数据发生改变是否放弃修改？
				discardModified:"データが変更されています。修正をキャンセルしますか。",
				//第一页
				firstPage:"第1ページ",
				//上一页
				prevPage:"前のページ",
				//下一页
				nextPage:"次のページ",
				//最后一页
				lastPage:"最終ページ",

				//保存修改？
				saveChanges:"修正を保存しますか。"
			},
			
			group:{
				//请选择进行分组的列
				tip:"グループ分けするカラムを選択してください。",
				//分组统计
				statistics:"グループで統計",
				//最大值
				max:"最大値",
				//最小值
				min:"最小値",
				//合计值
				sum:"合計値",
				//平均值
				avg:"平均値",
				//清除统计
				clear:"統計をクリア",
				//提交分组信息
				sumbitGroup:"グループ情報をサブミット",
				//移除分组列
				removeColumn:"グループ分けするカラムを削除",
				//空
				noValue:"空",
				//计
				count:"計",
                                //列校验信息
				columnCheckInfo:"カラムチェック情報",

				//必须设置至少一列可见
				columnVisible:"少なくとも1列を表示してください。"
			},
			
			filter:{
				//过滤
				filter:"フィルタリング",
				//清除本列过滤
				clearColumn:"コラムのフィルタリングをクリア",
				//清除表格过滤
				clearGrid:"グリッドのフィルタリングをクリア",
				//设置\${0}\列过滤条件
				configure:"\${0}\列のフィルタリング条件を設定",
				//等于
				eq:"イコール",
				//不等于
				neq:"ノットイコール",
				//大于
				gt:"大なり",
				//大于等于
				gte:"より大きいまたは等しい",
				//小于
				lt:"小なり",
				//小于等于
				lte:"より小さいまたは等しい",
				//包含
				include:"含む",
				//不包含
				exclude:"含まない",
				//为空
				empty:"空",
				//不为空
				notempty:"空ではない",
				//与
				and:"と",
				//或
				or:"または",
				//确定
				confirm:"確定",
				//取消
				cancel:"キャンセル"
			},
			
			toolbar:{
				//每页
				perPage:"1ページに",
				//条
				items:"件",
				//个性化
				individual:"カスタマイズ",
				//打印
				print:"印刷",
                                //共
				total:"合計",
				//条记录
				records:"件"
 
			}
		},
		
		
		//-----------------------布局控件-----------------------------//
		layout:{
			contentPane:{
				//正在装入...
				loading:"読み込み中..."
			},
			tabController:{
				//关闭
				close:"閉じる"
			}
		},
		
		
		//-----------------------对话框控件-----------------------------//
		dialog:{
			dialog:{
				// 对话框
				title :" ダイアログ",
				//最大化
				maximinze:"最大化",
				//关闭
				close:"閉じる",
				//还原
				restore:"元に戻す",
				//载入出错
				error:"読み込みエラー"
			},
			messageBox:{
				//确定
				confirm:"確定",
				//取消
				cancel:"キャンセル",
				//您是否确认？
				confirmText:"よろしいでしょうか。",
				//确认框
				confirmTitle:"確認ダイアログ",
				//是
				yes:"はい",
				//否
				no:"いいえ",
				//信息提示
				infoText:"メッセージ",
				//自动关闭确认框
				autoClose:"確認ダイアログを自動的に閉じる",
				//请输入内容
				inputContent:"入力してください",
				//输入提示框
				promptDialog:"入力ダイアログ"
			}
		},
		
		//-----------------------util文件夹下的文件-----------------------------//
		util:{
			debug:{
				//非json格式数据
				notJson:"非jsonデータ",
				//Json数据结构
				jsonData:"Jsonデータ構成"
			},
			
			installplugin:{
				//脚本解析引擎
				script:"スクリプト解析エンジン",
				//客户端缓存插件
				gears:"クライアントキャッシュプラグイン"
			},
			
			util:{
				//最大值
				max:"最大値",
				//最小值
				min:"最小値",
				//平均值
				avg:"平均値",
				//合计值
				sum:"合計値",
				//终止事件！
				stopEvent:"イベントを終了します。",
				//正在装载数据...
				loading:"データ読み込み中...",
				//关闭
				close:"閉じる",
				//请正确设置dojoType属性。
				dojoTypeError:"dojoType属性を正しく設定してください。",
				//yyyy-MM-dd
				efaultDateFormat:"yyyy-MM-dd"
			},
                        spell:{
                               //函数makePy需要字符串类型参数!
				makePy:"関数makePyに文字列型の引数が必要です。"
                        },

                        ie:{
                               //友情提示：您当前使用的浏览器是IE
				isIE:"ご使用のブラウザはIEです。",
				//，为了加快浏览速度，建议您升级到&nbsp;&nbsp;</span><a href='#' onClick='upgrade(event)'>IE8浏览器</a>。
				toIE8:"，快適に閲覧いただくために、&nbsp;&nbsp;</span><a href='#' onClick='upgrade(event)'>IE8にアップデートすることを推奨します。</a>。",
				//E8升级程序
				programForIE8:"IE8アップデートプログラム"
                        }
		},
		
	////-------------------------tooltip----------------------///////////
		tooltip:{
			//内容正在加载请稍候...
			loading:"読み込んでいます。しばらくお待ちください..."
		},
		
		////-------------------------rpc----------------------///////////
		rpc:{
			//会话过期请重新登录
			sessionOut:"セッションの有効期限が切れています。もう一度ログインしてください。",
			//请求数据成功！但回调方法出错；请检查自定义load回调函数。
			loadError:"データのリクエストに成功しました。コールバックメソッドにエラーが発生しました。カスタマイズのloadコールバック関数を確認してください。",
			//错误提示
			errorTip:"エラーメッセージ",
			//请求操作失败
			errorMessage:"リクエストに失敗しました。",
			//成功提示
			success:"成功メッセージ",
			//请求操作成功
			successMessage:"リクエストに成功しました。",
			//导出的布局信息为空！
			layoutInfoEmpty:"エクスポートしたレイアウトは空です。",
			//确定
			confirmButton:"確定",
			//提示信息
			info:"メッセージ",
			//由于数据资源文件配置出错程序不执行打印操作。
			printError:"データリソースファイルの設定エラーで印刷を実行できません。",
			//获取信息失败
			getInfoError:"情報の取得に失敗しました",
			//保存信息失败
			saveError:"情報の保存に失敗しました",
			//正在装载缓存数据...
			loadingCache:"キャッシュデータを読み込んでいます...",
			//装载缓存数据失败。
			loadCacheError:"キャッシュデータの読み込みに失敗しました。"
		},
		
		////-------------------------xgrid----------------------///////////
		xgrid:{
			individual:{
				//保存
				save:"保存",
				//重置
				reset:"リセット"
			},
			
			filter:{
				//过滤
				filter:"フィルタリング",
				//清除本列过滤
				clearColumn:"カラムのフィルタリングをクリア",
				//清除表格过滤
				clearGrid:"グリッドのフィルタリングをクリア",
				//设置\${0}\列过滤条件
				configure:"\${0}\カラムのフィルタリング条件を設定",
				//等于
				eq:"イコール",
				//不等于
				neq:"ノットイコール",
				//大于
				gt:"大なり",
				//大于等于
				gte:"より大きいまたは等しい",
				//小于
				lt:"小なり",
				//小于等于
				lte:"より小さいまたは等しい",
				//包含
				include:"含む",
				//不包含
				exclude:"含まない",
				//为空
				empty:"空",
				//不为空
				notempty:"空ではない",
				//与
				and:"と",
				//或
				or:"または",
				//确定
				confirm:"確定",
				//取消
				cancel:"キャンセル"
			},
			
			menu:{
				//锁定
				lockColumn:"ロック",
				//解锁
				unlockColumn:"ロック解除",
				//展现列
				columns:"コラム展開"
			},
                        binding:{
                                //计
				count:"計",
				//保存修改？
				saveMoidify:"修正を保存しますか。",
				//列校验信息
				columnCheckInfo:"カラムチェック情報"
                        },
            'export':{
            	//导出设置
				exportSetting:"エクスポート設置",
                //提示信息
				info:"メッセージ",
				//无可导出数据，请重新设置查询条件后再导出!
				noDataByQuery:"出力するデータがありません。検索条件をもう一度設定して出力してください。",				//无可导出数据，请先选择数据再导出!
				noDataByChoice:"出力するデータがありません。データを選択してから出力してください。"
            },
            
            'import':{
                //提示信息
				info:"メッセージ",
				//导入成功
				importSuccess:"導入に成功",
				//唯一性校验配置错误！错误字段:
				uniqueMessage:"唯一性検査配置エラー。エラーフィールド: ",
				//导入设置
				importSetting:"設定をインポート",
				//获取信息失败
				getInfoError:"情報の取得に失敗しました",
				//后台自定义校验中断校验，请联系管理员！
				backInterrupt:"楽屋カスタム検査中断検査。管理者に連絡してください。",
				//前台自定义校验中断校验！请联系管理员！
				proscInterrupt:"フロントカスタム検査中断検査。管理者に連絡してください。",
				//数据
				infoData:"データ"
			}
		},
		
		
	////-------------------------xgrid----------------------///////////
		tree:{
			dnd:{
				//是否确认执行拖拽操作？
				doDrop:"ドラッグしますか。"
			}
		},
			
            ////-------------------------patch----------------------///////////
                patch:{
                       rpc:{
                              
				//正在装载缓存数据…
				loadingCacheData :"キャッシュデータをロードしています…",
				//装载缓存数据失败。
				loadCacheDataFailed:"キャッシュデータのロードに失敗しました。",
				//获取信息失败
				getInfoFailed :"情報の取得に失敗しました。",
				//保存信息失败
				saveInfoFailed:"情報の保存に失敗しました。",
				//导出的布局信息为空！
				noLayoutInfo:"出力したレイアウト情報はありません。",
				//确定
				confirm:"確定",
				//提示信息
				info:"メッセージ",
				//由于数据资源文件配置出错,程序不执行打印操作。
				configError:"データリソースファイルの設定が間違っているため、印刷は実行されません。"
                       }
                },
////-------------------------global----------------------///////////
               global:{
                        comboBox:{                               
				//<请选择>
				choices:"<選択してください>"
                        }
               }
};